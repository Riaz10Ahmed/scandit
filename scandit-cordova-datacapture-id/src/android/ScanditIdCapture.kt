/*
 * This file is part of the Scandit Data Capture SDK
 *
 * Copyright (C) 2020- Scandit AG. All rights reserved.
 */

package com.scandit.datacapture.cordova.id

import android.Manifest
import com.scandit.datacapture.cordova.core.ScanditCaptureCore
import com.scandit.datacapture.cordova.core.actions.ActionSend
import com.scandit.datacapture.cordova.core.communication.CameraPermissionGrantedListener
import com.scandit.datacapture.cordova.core.communication.ModeDeserializersProvider
import com.scandit.datacapture.cordova.core.data.SerializableFinishModeCallbackData
import com.scandit.datacapture.cordova.core.errors.InvalidActionNameError
import com.scandit.datacapture.cordova.core.errors.JsonParseError
import com.scandit.datacapture.cordova.core.factories.ActionFactory
import com.scandit.datacapture.cordova.core.handlers.ActionsHandler
import com.scandit.datacapture.cordova.core.handlers.CameraPermissionsActionsHandlerHelper
import com.scandit.datacapture.cordova.core.utils.successAndKeepCallback
import com.scandit.datacapture.cordova.id.actions.ActionFinishCallback
import com.scandit.datacapture.cordova.id.actions.ActionGetDefaults
import com.scandit.datacapture.cordova.id.actions.ActionIdCaptureReset
import com.scandit.datacapture.cordova.id.actions.ActionSubscribeIdCapture
import com.scandit.datacapture.cordova.id.callbacks.IdCaptureCallback
import com.scandit.datacapture.cordova.id.data.defaults.SerializableIdDefaults
import com.scandit.datacapture.cordova.id.factories.IdCaptureActionFactory
import com.scandit.datacapture.cordova.id.handlers.IdCaptureHandler
import com.scandit.datacapture.core.data.FrameData
import com.scandit.datacapture.core.json.JsonValue
import com.scandit.datacapture.id.capture.IdCapture
import com.scandit.datacapture.id.capture.IdCaptureListener
import com.scandit.datacapture.id.capture.IdCaptureSession
import com.scandit.datacapture.id.capture.serialization.IdCaptureDeserializer
import com.scandit.datacapture.id.capture.serialization.IdCaptureDeserializerListener
import org.apache.cordova.CallbackContext
import org.apache.cordova.CordovaPlugin
import org.json.JSONArray
import org.json.JSONObject

class ScanditIdCapture : CordovaPlugin(),
    ModeDeserializersProvider,
    IdCaptureDeserializerListener,
    IdCaptureListener,
    IdActionsListeners,
    CameraPermissionGrantedListener {

    private val actionFactory: ActionFactory = IdCaptureActionFactory(this)
    private val actionsHandler: ActionsHandler = ActionsHandler(
        actionFactory, CameraPermissionsActionsHandlerHelper(actionFactory)
    )

    private var idCaptureCallback: IdCaptureCallback? = null
    private val idCaptureHandler: IdCaptureHandler = IdCaptureHandler(this)

    private var lastIdCaptureEnabledState: Boolean = false

    override fun pluginInitialize() {
        super.pluginInitialize()
        ScanditCaptureCore.addPlugin(serviceName)

        if (cordova.hasPermission(Manifest.permission.CAMERA)) {
            onCameraPermissionGranted()
        }
    }

    override fun onStop() {
        lastIdCaptureEnabledState = idCaptureHandler.idCapture?.isEnabled ?: false
        idCaptureHandler.idCapture?.isEnabled = false
        idCaptureCallback?.forceRelease()
    }

    override fun onStart() {
        idCaptureHandler.idCapture?.isEnabled = lastIdCaptureEnabledState
    }

    override fun onReset() {
        idCaptureHandler.disposeCurrent()
        idCaptureCallback?.dispose()
    }

    override fun execute(
        action: String,
        args: JSONArray,
        callbackContext: CallbackContext
    ): Boolean {
        return try {
            actionsHandler.addAction(action, args, callbackContext)
        } catch (e: InvalidActionNameError) {
            false
        } catch (e: Exception) {
            e.printStackTrace()
            true
        }
    }

    //region CameraPermissionGrantedListener
    override fun onCameraPermissionGranted() {
        actionsHandler.onCameraPermissionGranted()
    }
    //endregion

    //region IdCaptureListener
    override fun onIdCaptured(mode: IdCapture, session: IdCaptureSession, data: FrameData) {
        idCaptureCallback?.onIdCaptured(mode, session, data)
    }

    override fun onErrorEncountered(
        mode: IdCapture,
        error: Throwable,
        session: IdCaptureSession,
        data: FrameData
    ) {
        idCaptureCallback?.onErrorEncountered(mode, error, session, data)
    }
    //endregion IdCaptureListener

    //region ModeDeserializersProvider
    override fun provideModeDeserializers() = listOf(
        IdCaptureDeserializer().also {
            it.listener = this
        }
    )
    //endregion ModeDeserializersProvider

    //region IdCaptureDeserializerListener
    override fun onModeDeserializationFinished(
        deserializer: IdCaptureDeserializer,
        mode: IdCapture,
        json: JsonValue
    ) {
        if (json.contains("enabled")) {
            mode.isEnabled = json.requireByKeyAsBoolean("enabled")
        }
        idCaptureHandler.attachIdCapture(mode)
    }
    //endregion IdCaptureDeserializerListener

    //region ActionInjectDefaults.ResultListener
    override fun onIdCaptureDefaults(
        defaults: SerializableIdDefaults,
        callbackContext: CallbackContext
    ) {
        callbackContext.success(defaults.toJson())
    }
    //endregion ActionInjectDefaults.ResultListener

    override fun onJsonParseError(error: Throwable, callbackContext: CallbackContext) {
        JsonParseError(error.message).sendResult(callbackContext)
    }

    //region ActionSubscribeIdCapture.ResultListener
    override fun onSubscribeToIdCapture(callbackContext: CallbackContext) {
        idCaptureCallback?.dispose()
        idCaptureCallback = IdCaptureCallback(actionsHandler, callbackContext)
        callbackContext.successAndKeepCallback()
    }
    //endregion ActionSubscribeIdCapture.ResultListener

    //region ActionSend.ResultListener
    override fun onSendAction(
        actionName: String,
        message: JSONObject,
        callbackContext: CallbackContext
    ) {
        callbackContext.successAndKeepCallback(message)
    }
    //endregion ActionSend.ResultListener

    //region ActionFinishCallback.ResultListener
    override fun onFinishIdCaptureMode(finishData: SerializableFinishModeCallbackData?) {
        idCaptureCallback?.onFinishCallback(finishData)
    }
    //endregion ActionFinishCallback.ResultListener

    //region ActionFinishCallback.ResultListener
    override fun onReset(callbackContext: CallbackContext) {
        idCaptureHandler.idCapture?.reset()
        callbackContext.success()
    }
    //endregion ActionFinishCallback.ResultListener
}

interface IdActionsListeners : ActionGetDefaults.ResultListener,
    ActionSubscribeIdCapture.ResultListener,
    ActionSend.ResultListener,
    ActionFinishCallback.ResultListener,
    ActionIdCaptureReset.ResultListener

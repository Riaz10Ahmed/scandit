/*
 * This file is part of the Scandit Data Capture SDK
 *
 * Copyright (C) 2020- Scandit AG. All rights reserved.
 */

package com.scandit.datacapture.cordova.text

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
import com.scandit.datacapture.cordova.text.actions.ActionFinishCallback
import com.scandit.datacapture.cordova.text.actions.ActionInjectDefaults
import com.scandit.datacapture.cordova.text.actions.ActionSubscribeTextCapture
import com.scandit.datacapture.cordova.text.callbacks.TextCaptureCallback
import com.scandit.datacapture.cordova.text.data.defaults.SerializableTextDefaults
import com.scandit.datacapture.cordova.text.factories.TextCaptureActionFactory
import com.scandit.datacapture.cordova.text.handlers.TextCaptureHandler
import com.scandit.datacapture.core.capture.serialization.DataCaptureModeDeserializer
import com.scandit.datacapture.core.data.FrameData
import com.scandit.datacapture.core.json.JsonValue
import com.scandit.datacapture.text.capture.TextCapture
import com.scandit.datacapture.text.capture.TextCaptureListener
import com.scandit.datacapture.text.capture.TextCaptureSession
import com.scandit.datacapture.text.capture.serialization.TextCaptureDeserializer
import com.scandit.datacapture.text.capture.serialization.TextCaptureDeserializerListener
import org.apache.cordova.CallbackContext
import org.apache.cordova.CordovaPlugin
import org.json.JSONArray
import org.json.JSONObject

class ScanditTextCapture : CordovaPlugin(),
    CameraPermissionGrantedListener,
    ModeDeserializersProvider,
    TextActionsListeners,
    TextCaptureDeserializerListener,
    TextCaptureListener {

    private val actionFactory: ActionFactory = TextCaptureActionFactory(this)
    private val actionsHandler: ActionsHandler = ActionsHandler(
        actionFactory, CameraPermissionsActionsHandlerHelper(actionFactory)
    )

    private var textCaptureCallback: TextCaptureCallback? = null
    private val textCaptureHandler: TextCaptureHandler = TextCaptureHandler(this)

    private var lastTextCaptureEnabledState: Boolean = false

    override fun onStop() {
        lastTextCaptureEnabledState = textCaptureHandler.textCapture?.isEnabled ?: false
        textCaptureHandler.textCapture?.isEnabled = false
        textCaptureCallback?.forceRelease()
    }

    override fun onStart() {
        textCaptureHandler.textCapture?.isEnabled = lastTextCaptureEnabledState
    }

    override fun onReset() {
        textCaptureHandler.disposeCurrent()
        textCaptureCallback?.dispose()
    }

    override fun pluginInitialize() {
        super.pluginInitialize()
        ScanditCaptureCore.addPlugin(serviceName)

        if (cordova.hasPermission(Manifest.permission.CAMERA)) {
            onCameraPermissionGranted()
        }
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

    //region ModeDeserializersProvider
    override fun provideModeDeserializers(): List<DataCaptureModeDeserializer> = listOf(
        TextCaptureDeserializer()
            .also { it.listener = this }
    )
    //endregion

    //region TextCaptureDeserializerListener
    override fun onModeDeserializationFinished(
        deserializer: TextCaptureDeserializer,
        mode: TextCapture,
        json: JsonValue
    ) {
        if (json.contains("enabled")) {
            mode.isEnabled = json.requireByKeyAsBoolean("enabled")
        }
        textCaptureHandler.attachTextCapture(mode)
    }
    //endregion

    //region TextCaptureListener
    override fun onTextCaptured(mode: TextCapture, session: TextCaptureSession, data: FrameData) {
        textCaptureCallback?.onTextCaptured(mode, session, data)
    }
    //endregion

    //region Action callbacks
    //region ActionJsonParseErrorResultListener
    override fun onJsonParseError(error: Throwable, callbackContext: CallbackContext) {
        JsonParseError(error.message).sendResult(callbackContext)
    }
    //endregion

    //region ActionInjectDefaults.ResultListener
    override fun onTextDefaults(
        defaults: SerializableTextDefaults,
        callbackContext: CallbackContext
    ) {
        callbackContext.success(defaults.toJson())
    }
    //endregion

    //region ActionSubscribeTextCapture.ResultListener
    override fun onSubscribeToTextCapture(callbackContext: CallbackContext) {
        textCaptureCallback?.dispose()
        textCaptureCallback = TextCaptureCallback(actionsHandler, callbackContext)
        callbackContext.successAndKeepCallback()
    }
    //endregion

    //region ActionFinishCallback.ResultListener
    override fun onFinishTextCaptureMode(
        finishData: SerializableFinishModeCallbackData?,
        callbackContext: CallbackContext
    ) {
        textCaptureCallback?.onFinishCallback(finishData)
    }
    //endregion

    //region ActionSend.ResultListener
    override fun onSendAction(
        actionName: String,
        message: JSONObject,
        callbackContext: CallbackContext
    ) {
        callbackContext.successAndKeepCallback(message)
    }
    //endregion
    //endregion
}

interface TextActionsListeners : ActionInjectDefaults.ResultListener,
    ActionFinishCallback.ResultListener,
    ActionSubscribeTextCapture.ResultListener,
    ActionSend.ResultListener

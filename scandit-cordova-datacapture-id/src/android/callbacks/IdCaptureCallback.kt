/*
 * This file is part of the Scandit Data Capture SDK
 *
 * Copyright (C) 2020- Scandit AG. All rights reserved.
 */

package com.scandit.datacapture.cordova.id.callbacks

import com.scandit.datacapture.cordova.core.callbacks.Callback
import com.scandit.datacapture.cordova.core.data.SerializableFinishModeCallbackData
import com.scandit.datacapture.cordova.core.handlers.ActionsHandler
import com.scandit.datacapture.cordova.id.factories.IdCaptureActionFactory.Companion.SEND_ERROR_CAPTURING_EVENT
import com.scandit.datacapture.cordova.id.factories.IdCaptureActionFactory.Companion.SEND_ID_CAPTURED_EVENT
import com.scandit.datacapture.core.data.FrameData
import com.scandit.datacapture.id.capture.IdCapture
import com.scandit.datacapture.id.capture.IdCaptureListener
import com.scandit.datacapture.id.capture.IdCaptureSession
import java.util.concurrent.atomic.AtomicReference
import java.util.concurrent.locks.ReentrantLock
import kotlin.concurrent.withLock
import org.apache.cordova.CallbackContext
import org.json.JSONArray
import org.json.JSONObject

class IdCaptureCallback(
    private val actionsHandler: ActionsHandler,
    callbackContext: CallbackContext
) : Callback(callbackContext), IdCaptureListener {
    private val lock = ReentrantLock(true)
    private val condition = lock.newCondition()

    private val latestStateData = AtomicReference<SerializableFinishModeCallbackData?>(null)

    override fun onIdCaptured(mode: IdCapture, session: IdCaptureSession, data: FrameData) {
        if (disposed.get()) return

        lock.withLock {
            addActionOnCaptureEvent(SEND_ID_CAPTURED_EVENT, session)
            lockAndWait()
            onUnlock(mode)
        }
    }

    override fun onErrorEncountered(
        mode: IdCapture,
        error: Throwable,
        session: IdCaptureSession,
        data: FrameData
    ) {
        addActionOnCaptureEvent(SEND_ERROR_CAPTURING_EVENT, session)
    }

    private fun addActionOnCaptureEvent(actionName: String, session: IdCaptureSession) =
        actionsHandler.addAction(
            actionName,
            JSONArray().apply {
                put(
                    JSONObject(
                        mapOf(
                            FIELD_SESSION to session.toJson()
                        )
                    )
                )
            },
            callbackContext
        )

    private fun onUnlock(mode: IdCapture) {
        latestStateData.get()?.let { latestData ->
            mode.isEnabled = latestData.enabled
            latestStateData.set(null)
        }
        // If we don't have the latestData, it means no listener is set from js, so we do nothing.
    }

    private fun lockAndWait() {
        condition.await()
    }

    fun onFinishCallback(finishModeCallbackData: SerializableFinishModeCallbackData?) {
        latestStateData.set(finishModeCallbackData)
        unlock()
    }

    fun forceRelease() {
        lock.withLock {
            condition.signalAll()
        }
    }

    private fun unlock() {
        lock.withLock {
            condition.signal()
        }
    }

    override fun dispose() {
        super.dispose()
        forceRelease()
    }

    companion object {
        private const val FIELD_SESSION = "session"
    }
}

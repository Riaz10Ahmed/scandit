/*
 * This file is part of the Scandit Data Capture SDK
 *
 * Copyright (C) 2020- Scandit AG. All rights reserved.
 */

package com.scandit.datacapture.cordova.text.callbacks

import com.scandit.datacapture.cordova.core.callbacks.Callback
import com.scandit.datacapture.cordova.core.data.SerializableFinishModeCallbackData
import com.scandit.datacapture.cordova.core.handlers.ActionsHandler
import com.scandit.datacapture.cordova.text.factories.TextCaptureActionFactory
import com.scandit.datacapture.core.data.FrameData
import com.scandit.datacapture.text.capture.TextCapture
import com.scandit.datacapture.text.capture.TextCaptureListener
import com.scandit.datacapture.text.capture.TextCaptureSession
import java.util.concurrent.atomic.AtomicReference
import java.util.concurrent.locks.ReentrantLock
import kotlin.concurrent.withLock
import org.apache.cordova.CallbackContext
import org.json.JSONArray
import org.json.JSONObject

class TextCaptureCallback(
    private val actionsHandler: ActionsHandler,
    callbackContext: CallbackContext
) : Callback(callbackContext), TextCaptureListener {

    private val lock = ReentrantLock(true)
    private val condition = lock.newCondition()

    private val latestStateData = AtomicReference<SerializableFinishModeCallbackData?>(null)

    override fun onTextCaptured(mode: TextCapture, session: TextCaptureSession, data: FrameData) {
        if (disposed.get()) return

        lock.withLock {
            actionsHandler.addAction(
                TextCaptureActionFactory.SEND_TEXT_CAPTURED_EVENT,
                JSONArray().apply {
                    put(
                        JSONObject(
                            mapOf(
                                FIELD_SESSION to session.toJson(),
                                FIELD_FRAME_DATA to data.toJson()
                            )
                        )
                    )
                },
                callbackContext
            )
            lockAndWait()
            onUnlock(mode)
        }
    }

    private fun onUnlock(mode: TextCapture) {
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

    // TODO [SDC-2001] -> add frame data serialization
    private fun FrameData.toJson(): String = JSONObject(
        mapOf(FIELD_FRAME_DATA to JSONObject())
    ).toString()

    override fun dispose() {
        super.dispose()
        forceRelease()
    }

    companion object {
        private const val FIELD_SESSION = "session"
        private const val FIELD_FRAME_DATA = "frameData"
    }
}

/*
 * This file is part of the Scandit Data Capture SDK
 *
 * Copyright (C) 2020- Scandit AG. All rights reserved.
 */

package com.scandit.datacapture.cordova.text.actions

import com.scandit.datacapture.cordova.core.actions.Action
import com.scandit.datacapture.cordova.core.actions.ActionJsonParseErrorResultListener
import com.scandit.datacapture.cordova.core.data.defaults.SerializableBrushDefaults
import com.scandit.datacapture.cordova.core.data.defaults.SerializableCameraSettingsDefault
import com.scandit.datacapture.cordova.text.data.defaults.SerializableTextCaptureDefaults
import com.scandit.datacapture.cordova.text.data.defaults.SerializableTextCaptureOverlayDefaults
import com.scandit.datacapture.cordova.text.data.defaults.SerializableTextCaptureSettingsDefaults
import com.scandit.datacapture.cordova.text.data.defaults.SerializableTextDefaults
import com.scandit.datacapture.text.capture.TextCapture
import com.scandit.datacapture.text.capture.TextCaptureSettings
import com.scandit.datacapture.text.ui.TextCaptureOverlay
import org.apache.cordova.CallbackContext
import org.json.JSONArray

class ActionInjectDefaults(
    private val listener: ResultListener
) : Action {

    override fun run(args: JSONArray, callbackContext: CallbackContext) {
        try {
            val defaults = SerializableTextDefaults(
                textCaptureDefaults = SerializableTextCaptureDefaults(
                    textCaptureOverlayDefaults = SerializableTextCaptureOverlayDefaults(
                        brushDefaults = SerializableBrushDefaults(
                            TextCaptureOverlay.DEFAULT_BRUSH
                        )
                    ),
                    textCaptureSettingsDefaults = SerializableTextCaptureSettingsDefaults(
                        TextCaptureSettings.fromJson("{}")
                    ),
                    recommendedCameraSettings = SerializableCameraSettingsDefault(
                        TextCapture.createRecommendedCameraSettings()
                    )
                )
            )
            listener.onTextDefaults(defaults, callbackContext)
        } catch (e: Exception) {
            e.printStackTrace()
            listener.onJsonParseError(e, callbackContext)
        }
    }

    interface ResultListener : ActionJsonParseErrorResultListener {
        fun onTextDefaults(
            defaults: SerializableTextDefaults,
            callbackContext: CallbackContext
        )
    }
}

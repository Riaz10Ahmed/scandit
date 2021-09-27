/*
 * This file is part of the Scandit Data Capture SDK
 *
 * Copyright (C) 2020- Scandit AG. All rights reserved.
 */

package com.scandit.datacapture.cordova.id.actions

import com.scandit.datacapture.cordova.core.actions.Action
import com.scandit.datacapture.cordova.core.actions.ActionJsonParseErrorResultListener
import com.scandit.datacapture.cordova.core.data.defaults.SerializableCameraSettingsDefault
import com.scandit.datacapture.cordova.id.data.defaults.SerializableIdCaptureDefaults
import com.scandit.datacapture.cordova.id.data.defaults.SerializableIdDefaults
import com.scandit.datacapture.id.capture.IdCapture
import org.apache.cordova.CallbackContext
import org.json.JSONArray

class ActionGetDefaults(
    private val listener: ResultListener
) : Action {
    override fun run(args: JSONArray, callbackContext: CallbackContext) {
        try {
            val defaults = SerializableIdDefaults(
                serializableIdCaptureDefaults = SerializableIdCaptureDefaults(
                    recommendedCameraSettings = SerializableCameraSettingsDefault(
                        IdCapture.createRecommendedCameraSettings()
                    )
                )
            )
            listener.onIdCaptureDefaults(defaults, callbackContext)
        } catch (e: Exception) {
            e.printStackTrace()
            listener.onJsonParseError(e, callbackContext)
        }
    }

    interface ResultListener : ActionJsonParseErrorResultListener {
        fun onIdCaptureDefaults(
            defaults: SerializableIdDefaults,
            callbackContext: CallbackContext
        )
    }
}

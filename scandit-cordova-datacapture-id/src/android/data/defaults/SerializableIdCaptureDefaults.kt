/*
 * This file is part of the Scandit Data Capture SDK
 *
 * Copyright (C) 2020- Scandit AG. All rights reserved.
 */

package com.scandit.datacapture.cordova.id.data.defaults

import com.scandit.datacapture.cordova.core.data.SerializableData
import com.scandit.datacapture.cordova.core.data.defaults.SerializableCameraSettingsDefault
import org.json.JSONObject

class SerializableIdCaptureDefaults(
    private val recommendedCameraSettings: SerializableCameraSettingsDefault
) : SerializableData {
    override fun toJson() = JSONObject(
        mapOf(
            FIELD_RECOMMENDED_CAMERA_SETTINGS to recommendedCameraSettings.toJson()
        )
    )

    private companion object {
        const val FIELD_RECOMMENDED_CAMERA_SETTINGS = "RecommendedCameraSettings"
    }
}

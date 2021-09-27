/*
 * This file is part of the Scandit Data Capture SDK
 *
 * Copyright (C) 2020- Scandit AG. All rights reserved.
 */

package com.scandit.datacapture.cordova.text.data.defaults

import com.scandit.datacapture.cordova.core.data.SerializableData
import com.scandit.datacapture.cordova.core.data.defaults.SerializableBrushDefaults
import org.json.JSONObject

data class SerializableTextCaptureOverlayDefaults(
    private val brushDefaults: SerializableBrushDefaults
) : SerializableData {

    override fun toJson(): JSONObject = JSONObject(
        mapOf(FIELD_BRUSH_DEFAULTS to brushDefaults.toJson())
    )

    private companion object {
        const val FIELD_BRUSH_DEFAULTS = "DefaultBrush"
    }
}

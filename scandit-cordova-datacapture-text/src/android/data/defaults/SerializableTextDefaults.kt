/*
 * This file is part of the Scandit Data Capture SDK
 *
 * Copyright (C) 2020- Scandit AG. All rights reserved.
 */

package com.scandit.datacapture.cordova.text.data.defaults

import com.scandit.datacapture.cordova.core.data.SerializableData
import org.json.JSONObject

data class SerializableTextDefaults(
    private val textCaptureDefaults: SerializableTextCaptureDefaults
) : SerializableData {

    override fun toJson(): JSONObject = JSONObject(
        mapOf(FIELD_TEXT_CAPTURE_DEFAULTS to textCaptureDefaults.toJson())
    )

    private companion object {
        const val FIELD_TEXT_CAPTURE_DEFAULTS = "TextCapture"
    }
}

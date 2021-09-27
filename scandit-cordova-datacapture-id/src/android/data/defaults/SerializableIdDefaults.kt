/*
 * This file is part of the Scandit Data Capture SDK
 *
 * Copyright (C) 2020- Scandit AG. All rights reserved.
 */

package com.scandit.datacapture.cordova.id.data.defaults

import com.scandit.datacapture.cordova.core.data.SerializableData
import org.json.JSONObject

class SerializableIdDefaults(
    private val serializableIdCaptureDefaults: SerializableIdCaptureDefaults
) : SerializableData {

    override fun toJson() = JSONObject(
        mapOf(FIELD_ID_CAPTURE_DEFAULTS to serializableIdCaptureDefaults.toJson())
    )

    private companion object {
        const val FIELD_ID_CAPTURE_DEFAULTS = "IdCapture"
    }
}

/*
 * This file is part of the Scandit Data Capture SDK
 *
 * Copyright (C) 2020- Scandit AG. All rights reserved.
 */

package com.scandit.datacapture.cordova.id.actions

import com.scandit.datacapture.cordova.core.actions.Action
import com.scandit.datacapture.cordova.core.actions.ActionJsonParseErrorResultListener
import org.apache.cordova.CallbackContext
import org.json.JSONArray

class ActionIdCaptureReset(
    private val listener: ResultListener
) : Action {
    interface ResultListener : ActionJsonParseErrorResultListener {
        fun onReset(callbackContext: CallbackContext)
    }

    override fun run(args: JSONArray, callbackContext: CallbackContext) {
        listener.onReset(callbackContext)
    }
}

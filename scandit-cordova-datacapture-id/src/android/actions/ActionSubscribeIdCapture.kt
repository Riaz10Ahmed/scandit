/*
 * This file is part of the Scandit Data Capture SDK
 *
 * Copyright (C) 2020- Scandit AG. All rights reserved.
 */

package com.scandit.datacapture.cordova.id.actions

import com.scandit.datacapture.cordova.core.actions.Action
import org.apache.cordova.CallbackContext
import org.json.JSONArray

class ActionSubscribeIdCapture(
    private val listener: ResultListener
) : Action {

    override fun run(args: JSONArray, callbackContext: CallbackContext) {
        listener.onSubscribeToIdCapture(callbackContext)
    }

    interface ResultListener {
        fun onSubscribeToIdCapture(callbackContext: CallbackContext)
    }
}

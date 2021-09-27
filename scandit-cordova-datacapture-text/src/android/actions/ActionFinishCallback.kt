/*
 * This file is part of the Scandit Data Capture SDK
 *
 * Copyright (C) 2020- Scandit AG. All rights reserved.
 */

package com.scandit.datacapture.cordova.text.actions

import com.scandit.datacapture.cordova.core.actions.Action
import com.scandit.datacapture.cordova.core.actions.ActionJsonParseErrorResultListener
import com.scandit.datacapture.cordova.core.data.SerializableCallbackAction.Companion.FIELD_FINISH_CALLBACK_ID
import com.scandit.datacapture.cordova.core.data.SerializableFinishModeCallbackData
import com.scandit.datacapture.cordova.text.factories.TextCaptureActionFactory.Companion.ACTION_TEXT_CAPTURED
import org.apache.cordova.CallbackContext
import org.json.JSONArray
import org.json.JSONException
import org.json.JSONObject

class ActionFinishCallback(
    private val listener: ResultListener
) : Action {

    override fun run(args: JSONArray, callbackContext: CallbackContext) {
        try {
            val data = args.getJSONObject(0)
            // We need the "result" field to exist ( null is also allowed )
            if (!data.has(FIELD_RESULT)) {
                throw JSONException("Missing $FIELD_RESULT field in response json")
            }
            val result: JSONObject? = data.optJSONObject(FIELD_RESULT)
            when {
                isFinishTextCaptureModeCallback(data) -> listener.onFinishTextCaptureMode(
                    SerializableFinishModeCallbackData.fromJson(result), callbackContext
                )
                else ->
                    throw JSONException("Cannot recognise finish callback action with data $data")
            }
        } catch (e: JSONException) {
            e.printStackTrace()
            listener.onJsonParseError(e, callbackContext)
        } catch (e: RuntimeException) { // TODO [SDC-1851] - fine-catch deserializer exceptions
            e.printStackTrace()
            listener.onJsonParseError(e, callbackContext)
        }
    }

    private fun isFinishTextCaptureModeCallback(data: JSONObject) =
            data.has(FIELD_FINISH_CALLBACK_ID) &&
                    data[FIELD_FINISH_CALLBACK_ID] == ACTION_TEXT_CAPTURED

    companion object {
        private const val FIELD_RESULT = "result"
    }

    interface ResultListener : ActionJsonParseErrorResultListener {
        fun onFinishTextCaptureMode(
            finishData: SerializableFinishModeCallbackData?,
            callbackContext: CallbackContext
        )
    }
}

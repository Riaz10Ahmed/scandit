/*
 * This file is part of the Scandit Data Capture SDK
 *
 * Copyright (C) 2020- Scandit AG. All rights reserved.
 */

package com.scandit.datacapture.cordova.text.factories

import com.scandit.datacapture.cordova.core.actions.Action
import com.scandit.datacapture.cordova.core.actions.ActionSend
import com.scandit.datacapture.cordova.core.errors.InvalidActionNameError
import com.scandit.datacapture.cordova.core.factories.ActionFactory
import com.scandit.datacapture.cordova.text.TextActionsListeners
import com.scandit.datacapture.cordova.text.actions.ActionFinishCallback
import com.scandit.datacapture.cordova.text.actions.ActionInjectDefaults
import com.scandit.datacapture.cordova.text.actions.ActionSubscribeTextCapture

class TextCaptureActionFactory(
    private val listener: TextActionsListeners
) : ActionFactory {

    @Throws(InvalidActionNameError::class)
    override fun provideAction(actionName: String): Action {
        return when (actionName) {
            INJECT_DEFAULTS -> createActionInjectDefaults()
            SUBSCRIBE_TEXT_CAPTURE -> createActionSubscribeTextCapture()
            FINISH_BLOCKING_ACTION -> createActionFinishBlocking()
            SEND_TEXT_CAPTURED_EVENT -> createActionTextCaptured()
            else -> throw InvalidActionNameError(actionName)
        }
    }

    override fun canBeRunWithoutCameraPermission(actionName: String): Boolean = true

    private fun createActionInjectDefaults(): Action = ActionInjectDefaults(listener)

    private fun createActionSubscribeTextCapture() = ActionSubscribeTextCapture(listener)

    private fun createActionFinishBlocking() = ActionFinishCallback(listener)

    private fun createActionTextCaptured() = ActionSend(
        ACTION_TEXT_CAPTURED,
        listener,
        finishCallbackId = ACTION_TEXT_CAPTURED,
        shouldNotifyWhenFinished = true
    )

    companion object {
        private const val INJECT_DEFAULTS = "getDefaults"
        private const val SUBSCRIBE_TEXT_CAPTURE = "subscribeTextCaptureListener"
        private const val FINISH_BLOCKING_ACTION = "finishCallback"

        const val SEND_TEXT_CAPTURED_EVENT = "sendTextCaptureEvent"

        const val ACTION_TEXT_CAPTURED = "didCaptureInTextCapture"
    }
}

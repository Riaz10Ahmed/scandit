/*
 * This file is part of the Scandit Data Capture SDK
 *
 * Copyright (C) 2020- Scandit AG. All rights reserved.
 */

package com.scandit.datacapture.cordova.id.factories

import com.scandit.datacapture.cordova.core.actions.Action
import com.scandit.datacapture.cordova.core.actions.ActionSend
import com.scandit.datacapture.cordova.core.errors.InvalidActionNameError
import com.scandit.datacapture.cordova.core.factories.ActionFactory
import com.scandit.datacapture.cordova.id.IdActionsListeners
import com.scandit.datacapture.cordova.id.actions.ActionFinishCallback
import com.scandit.datacapture.cordova.id.actions.ActionGetDefaults
import com.scandit.datacapture.cordova.id.actions.ActionIdCaptureReset
import com.scandit.datacapture.cordova.id.actions.ActionSubscribeIdCapture

class IdCaptureActionFactory(
    private val listener: IdActionsListeners
) : ActionFactory {

    @Throws(InvalidActionNameError::class)
    override fun provideAction(actionName: String): Action {
        return when (actionName) {
            GET_DEFAULTS -> createActionGetDefaults()
            SUBSCRIBE_ID_CAPTURE_LISTENER -> createActionSubscribeIdCapture()
            FINISH_BLOCKING_ACTION -> createActionFinishBlocking()
            SEND_ID_CAPTURED_EVENT -> createActionIdCaptured()
            SEND_ERROR_CAPTURING_EVENT -> createActionErrorIdCapturing()
            RESET_ID_CAPTURE_ACTION -> createResetIdCaptureAction()
            else -> throw InvalidActionNameError(actionName)
        }
    }

    override fun canBeRunWithoutCameraPermission(actionName: String): Boolean = true

    private fun createActionGetDefaults(): Action = ActionGetDefaults(listener)

    private fun createActionSubscribeIdCapture(): Action = ActionSubscribeIdCapture(listener)

    private fun createActionFinishBlocking() = ActionFinishCallback(listener)

    private fun createActionIdCaptured() = ActionSend(
        ACTION_ID_CAPTURED,
        listener,
        finishCallbackId = ACTION_ID_CAPTURED,
        shouldNotifyWhenFinished = true
    )

    private fun createActionErrorIdCapturing() = ActionSend(
        ACTION_ERROR_CAPTURING,
        listener
    )

    private fun createResetIdCaptureAction() = ActionIdCaptureReset(listener)

    companion object {
        private const val GET_DEFAULTS = "getDefaults"
        private const val SUBSCRIBE_ID_CAPTURE_LISTENER = "subscribeIdCaptureListener"
        private const val FINISH_BLOCKING_ACTION = "finishCallback"
        private const val RESET_ID_CAPTURE_ACTION = "resetIdCapture"

        const val SEND_ID_CAPTURED_EVENT = "sendIdCaptureEvent"
        const val SEND_ERROR_CAPTURING_EVENT = "sendErrorCapturingEvent"
        const val ACTION_ID_CAPTURED = "didCaptureInIdCapture"
        const val ACTION_ERROR_CAPTURING = "didFailWithError"
    }
}

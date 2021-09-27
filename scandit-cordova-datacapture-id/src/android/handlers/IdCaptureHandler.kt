/*
 * This file is part of the Scandit Data Capture SDK
 *
 * Copyright (C) 2020- Scandit AG. All rights reserved.
 */

package com.scandit.datacapture.cordova.id.handlers

import com.scandit.datacapture.id.capture.IdCapture
import com.scandit.datacapture.id.capture.IdCaptureListener

class IdCaptureHandler(
    private val idCaptureListener: IdCaptureListener
) {

    var idCapture: IdCapture? = null
        private set

    fun attachIdCapture(idCapture: IdCapture) {
        if (this.idCapture != idCapture) {
            disposeCurrent()
            idCapture.addListener(idCaptureListener)
            this.idCapture = idCapture
        }
    }

    fun disposeCurrent() {
        idCapture?.apply {
            removeListener(idCaptureListener)
        }
        idCapture = null
    }
}

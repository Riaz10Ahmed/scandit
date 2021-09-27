/*
 * This file is part of the Scandit Data Capture SDK
 *
 * Copyright (C) 2020- Scandit AG. All rights reserved.
 */

package com.scandit.datacapture.cordova.text.handlers

import com.scandit.datacapture.text.capture.TextCapture
import com.scandit.datacapture.text.capture.TextCaptureListener

class TextCaptureHandler(
    private val textCaptureListener: TextCaptureListener
) {

    var textCapture: TextCapture? = null
        private set

    fun attachTextCapture(textCapture: TextCapture) {
        if (this.textCapture != textCapture) {
            disposeCurrent()
            textCapture.addListener(textCaptureListener)
            this.textCapture = textCapture
        }
    }

    fun disposeCurrent() {
        textCapture?.apply {
            removeListener(textCaptureListener)
        }
        textCapture = null
    }
}

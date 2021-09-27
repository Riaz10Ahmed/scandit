"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const TextCapture_Related_1 = require("scandit-cordova-datacapture-text.TextCapture+Related");
const Cordova_1 = require("scandit-cordova-datacapture-text.Cordova");
var TextCaptureListenerEvent;
(function (TextCaptureListenerEvent) {
    TextCaptureListenerEvent["DidCapture"] = "didCaptureInTextCapture";
})(TextCaptureListenerEvent || (TextCaptureListenerEvent = {}));
class TextCaptureListenerProxy {
    static forTextCapture(textCapture) {
        const proxy = new TextCaptureListenerProxy();
        proxy.textCapture = textCapture;
        proxy.initialize();
        return proxy;
    }
    initialize() {
        this.subscribeListener();
    }
    subscribeListener() {
        TextCaptureListenerProxy.cordovaExec(this.notifyListeners.bind(this), null, Cordova_1.CordovaFunction.SubscribeTextCaptureListener, null);
    }
    notifyListeners(event) {
        const done = () => {
            this.textCapture.isInListenerCallback = false;
            return { enabled: this.textCapture.isEnabled };
        };
        this.textCapture.isInListenerCallback = true;
        if (!event) {
            // The event could be undefined/null in case the plugin result did not pass a "message",
            // which could happen e.g. in case of "ok" results, which could signal e.g. successful
            // listener subscriptions.
            return done();
        }
        this.textCapture.listeners.forEach((listener) => {
            switch (event.name) {
                case TextCaptureListenerEvent.DidCapture:
                    if (listener.didCaptureText) {
                        listener.didCaptureText(this.textCapture, TextCapture_Related_1.TextCaptureSession
                            .fromJSON(JSON.parse(event.argument.session)));
                    }
                    break;
            }
        });
        return done();
    }
}
exports.TextCaptureListenerProxy = TextCaptureListenerProxy;
TextCaptureListenerProxy.cordovaExec = Cordova_1.Cordova.exec;

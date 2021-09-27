"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IdCaptureListenerProxy = void 0;
const IdCapture_Related_1 = require("scandit-cordova-datacapture-id.IdCapture+Related");
const Cordova_1 = require("scandit-cordova-datacapture-id.Cordova");
var IdCaptureListenerEvent;
(function (IdCaptureListenerEvent) {
    IdCaptureListenerEvent["DidCapture"] = "didCaptureInIdCapture";
    IdCaptureListenerEvent["DidFail"] = "didFailInIdCapture";
})(IdCaptureListenerEvent || (IdCaptureListenerEvent = {}));
class IdCaptureListenerProxy {
    static forIdCapture(idCapture) {
        const proxy = new IdCaptureListenerProxy();
        proxy.idCapture = idCapture;
        proxy.initialize();
        return proxy;
    }
    initialize() {
        this.subscribeListener();
    }
    subscribeListener() {
        IdCaptureListenerProxy.cordovaExec(this.notifyListeners.bind(this), null, Cordova_1.CordovaFunction.SubscribeIdCaptureListener, null);
    }
    notifyListeners(event) {
        const done = () => {
            this.idCapture.isInListenerCallback = false;
            return { enabled: this.idCapture.isEnabled };
        };
        this.idCapture.isInListenerCallback = true;
        if (!event) {
            // The event could be undefined/null in case the plugin result did not pass a "message",
            // which could happen e.g. in case of "ok" results, which could signal e.g. successful
            // listener subscriptions.
            return done();
        }
        this.idCapture.listeners.forEach((listener) => {
            switch (event.name) {
                case IdCaptureListenerEvent.DidCapture:
                    if (listener.didCaptureId) {
                        listener.didCaptureId(this.idCapture, IdCapture_Related_1.IdCaptureSession
                            .fromJSON(JSON.parse(event.argument.session)));
                    }
                    break;
                case IdCaptureListenerEvent.DidFail:
                    if (listener.didFailWithError) {
                        const session = IdCapture_Related_1.IdCaptureSession
                            .fromJSON(JSON.parse(event.argument.session));
                        listener.didFailWithError(this.idCapture, session._error, session);
                    }
            }
        });
        return done();
    }
}
exports.IdCaptureListenerProxy = IdCaptureListenerProxy;
IdCaptureListenerProxy.cordovaExec = Cordova_1.Cordova.exec;

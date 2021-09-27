"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IdCaptureProxy = void 0;
/// <amd-module name="scandit-cordova-datacapture-id.IdCaptureProxy"/>
// ^ needed because Cordova can't resolve "../xx" style dependencies
const Cordova_1 = require("scandit-cordova-datacapture-id.Cordova");
class IdCaptureProxy {
    static forIdCapture(idCapture) {
        const proxy = new IdCaptureProxy();
        proxy.idCapture = idCapture;
        return proxy;
    }
    reset() {
        return new Promise((resolve, reject) => {
            IdCaptureProxy.cordovaExec(resolve, reject, Cordova_1.CordovaFunction.ResetIdCapture, null);
        });
    }
}
exports.IdCaptureProxy = IdCaptureProxy;
IdCaptureProxy.cordovaExec = Cordova_1.Cordova.exec;

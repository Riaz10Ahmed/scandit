"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CordovaFunction = exports.Cordova = void 0;
/// <amd-module name="scandit-cordova-datacapture-id.Cordova"/>
// ^ needed because Cordova can't resolve "../xx" style dependencies
const CommonCordova_1 = require("scandit-cordova-datacapture-core.CommonCordova");
const Defaults_1 = require("scandit-cordova-datacapture-id.Defaults");
// tslint:disable-next-line:variable-name
exports.Cordova = {
    pluginName: 'ScanditIdCapture',
    defaults: {},
    exec: (success, error, functionName, args) => CommonCordova_1.cordovaExec(success, error, exports.Cordova.pluginName, functionName, args),
};
const getDefaults = new Promise((resolve, reject) => {
    exports.Cordova.exec((defaultsJSON) => {
        exports.Cordova.defaults = Defaults_1.defaultsFromJSON(defaultsJSON);
        resolve();
    }, reject, 'getDefaults', null);
});
CommonCordova_1.initializePlugin(exports.Cordova.pluginName, getDefaults);
var CordovaFunction;
(function (CordovaFunction) {
    CordovaFunction["SubscribeIdCaptureListener"] = "subscribeIdCaptureListener";
    CordovaFunction["ResetIdCapture"] = "resetIdCapture";
})(CordovaFunction = exports.CordovaFunction || (exports.CordovaFunction = {}));

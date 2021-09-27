"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/// <amd-module name="scandit-cordova-datacapture-text.Cordova"/>
// ^ needed because Cordova can't resolve "../xx" style dependencies
const CommonCordova_1 = require("scandit-cordova-datacapture-core.CommonCordova");
const Defaults_1 = require("scandit-cordova-datacapture-text.Defaults");
// tslint:disable-next-line:variable-name
exports.Cordova = {
    pluginName: 'ScanditTextCapture',
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
    CordovaFunction["SubscribeTextCaptureListener"] = "subscribeTextCaptureListener";
})(CordovaFunction = exports.CordovaFunction || (exports.CordovaFunction = {}));

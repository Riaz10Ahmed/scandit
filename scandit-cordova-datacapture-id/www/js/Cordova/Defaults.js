"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.defaultsFromJSON = void 0;
/// <amd-module name="scandit-cordova-datacapture-id.Defaults"/>
// ^ needed because Cordova can't resolve "../xx" style dependencies
const Camera_Related_1 = require("scandit-cordova-datacapture-core.Camera+Related");
exports.defaultsFromJSON = (json) => {
    return {
        IdCapture: {
            RecommendedCameraSettings: Camera_Related_1.CameraSettings
                .fromJSON(json.IdCapture.RecommendedCameraSettings),
        },
    };
};

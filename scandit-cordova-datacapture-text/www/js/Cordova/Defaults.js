"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/// <amd-module name="scandit-cordova-datacapture-text.Defaults"/>
// ^ needed because Cordova can't resolve "../xx" style dependencies
const Camera_Related_1 = require("scandit-cordova-datacapture-core.Camera+Related");
const Common_1 = require("scandit-cordova-datacapture-core.Common");
exports.defaultsFromJSON = (json) => {
    return {
        TextCapture: {
            TextCaptureOverlay: {
                DefaultBrush: {
                    fillColor: Common_1.Color
                        .fromJSON(json.TextCapture.TextCaptureOverlay.DefaultBrush.fillColor),
                    strokeColor: Common_1.Color
                        .fromJSON(json.TextCapture.TextCaptureOverlay.DefaultBrush.strokeColor),
                    strokeWidth: json.TextCapture.TextCaptureOverlay.DefaultBrush.strokeWidth,
                },
            },
            TextCaptureSettings: {
                recognitionDirection: json.TextCapture.TextCaptureSettings.recognitionDirection,
                duplicateFilter: json.TextCapture.TextCaptureSettings.duplicateFilter,
            },
            RecommendedCameraSettings: Camera_Related_1.CameraSettings
                .fromJSON(json.TextCapture.RecommendedCameraSettings),
        },
    };
};

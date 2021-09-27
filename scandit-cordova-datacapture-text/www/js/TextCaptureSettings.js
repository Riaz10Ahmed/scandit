"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const Cordova_1 = require("scandit-cordova-datacapture-text.Cordova");
const LocationSelection_1 = require("scandit-cordova-datacapture-core.LocationSelection");
const Serializeable_1 = require("scandit-cordova-datacapture-core.Serializeable");
class TextCaptureSettings extends Serializeable_1.DefaultSerializeable {
    constructor() {
        super();
        this.duplicateFilter = Cordova_1.Cordova.defaults.TextCapture.TextCaptureSettings.duplicateFilter;
        this.locationSelection = null;
        this.recognitionDirection = Cordova_1.Cordova.defaults.TextCapture.TextCaptureSettings.recognitionDirection;
    }
    static fromJSON(json) {
        const settings = new TextCaptureSettings();
        Object.keys(json).forEach(key => {
            settings[key] = json[key];
        });
        return settings;
    }
}
__decorate([
    Serializeable_1.serializationDefault(LocationSelection_1.NoneLocationSelection)
], TextCaptureSettings.prototype, "locationSelection", void 0);
exports.TextCaptureSettings = TextCaptureSettings;

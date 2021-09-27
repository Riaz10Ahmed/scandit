"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IdCaptureSettings = void 0;
/// <amd-module name="scandit-cordova-datacapture-id.IdCaptureSettings"/>
// ^ needed because Cordova can't resolve "../xx" style dependencies
const Enums_1 = require("scandit-cordova-datacapture-id.Enums");
const Serializeable_1 = require("scandit-cordova-datacapture-core.Serializeable");
class IdCaptureSettings extends Serializeable_1.DefaultSerializeable {
    constructor() {
        super();
        this.properties = {};
        this.imageToResult = {};
        this.supportedDocuments = [];
        this.supportedSides = Enums_1.SupportedSides.FrontOnly;
    }
    setProperty(name, value) {
        this.properties[name] = value;
    }
    getProperty(name) {
        return this.properties[name];
    }
    setShouldPassImageTypeToResult(type, shouldPass) {
        this.imageToResult[type] = shouldPass;
    }
    getShouldPassImageTypeToResult(type) {
        return this.imageToResult[type] || false;
    }
}
exports.IdCaptureSettings = IdCaptureSettings;

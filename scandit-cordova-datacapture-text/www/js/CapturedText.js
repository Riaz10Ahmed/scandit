"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/// <amd-module name="scandit-cordova-datacapture-text.CapturedText"/>
// ^ needed because Cordova can't resolve "../xx" style dependencies
const Common_1 = require("scandit-cordova-datacapture-core.Common");
class CapturedText {
    get value() {
        return this._value;
    }
    get location() {
        return this._location;
    }
    static fromJSON(json) {
        const text = new CapturedText();
        text._value = json.value;
        text._location = Common_1.Quadrilateral.fromJSON(json.location);
        return text;
    }
}
exports.CapturedText = CapturedText;

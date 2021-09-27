"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.IdCaptureOverlay = exports.IdCaptureSession = exports.IdCaptureError = void 0;
/// <amd-module name="scandit-cordova-datacapture-id.IdCapture+Related"/>
// ^ needed because Cordova can't resolve "../xx" style dependencies
const CapturedId_1 = require("scandit-cordova-datacapture-id.CapturedId");
const Enums_1 = require("scandit-cordova-datacapture-id.Enums");
const Serializeable_1 = require("scandit-cordova-datacapture-core.Serializeable");
class IdCaptureError {
    get type() {
        return this._type;
    }
    get message() {
        return this._message;
    }
    static fromJSON(json) {
        const error = new IdCaptureError();
        error._type = json.type;
        error._message = json.message;
        return error;
    }
}
exports.IdCaptureError = IdCaptureError;
class IdCaptureSession {
    get newlyCapturedId() {
        return this._newlyCapturedId;
    }
    get frameSequenceId() {
        return this._frameSequenceId;
    }
    static fromJSON(json) {
        const session = new IdCaptureSession();
        if (json.newlyCapturedId) {
            session._newlyCapturedId = CapturedId_1.CapturedId.fromJSON(json.newlyCapturedId);
        }
        session._frameSequenceId = json.frameSequenceId;
        session._error = json.error ? IdCaptureError.fromJSON(json.error) : null;
        return session;
    }
}
exports.IdCaptureSession = IdCaptureSession;
class IdCaptureOverlay extends Serializeable_1.DefaultSerializeable {
    constructor() {
        super();
        this.type = 'idCapture';
        this._idLayout = Enums_1.IdLayout.Auto;
        this._idLayoutStyle = Enums_1.IdLayoutStyle.Rounded;
        this._idLayoutLineStyle = Enums_1.IdLayoutLineStyle.Light;
    }
    static withIdCapture(idCapture) {
        return IdCaptureOverlay.withIdCaptureForView(idCapture, null);
    }
    static withIdCaptureForView(idCapture, view) {
        const overlay = new IdCaptureOverlay();
        overlay.idCapture = idCapture;
        if (view) {
            view.addOverlay(overlay);
        }
        return overlay;
    }
    setIdLayout(idLayout) {
        this._idLayout = idLayout;
        this.idCapture.didChange();
    }
    get idLayoutStyle() {
        return this._idLayoutStyle;
    }
    set idLayoutStyle(style) {
        this._idLayoutStyle = style;
        this.idCapture.didChange();
    }
    get idLayoutLineStyle() {
        return this._idLayoutLineStyle;
    }
    set idLayoutLineStyle(lineStyle) {
        this._idLayoutLineStyle = lineStyle;
        this.idCapture.didChange();
    }
}
__decorate([
    Serializeable_1.ignoreFromSerialization
], IdCaptureOverlay.prototype, "idCapture", void 0);
__decorate([
    Serializeable_1.nameForSerialization('idLayout')
], IdCaptureOverlay.prototype, "_idLayout", void 0);
__decorate([
    Serializeable_1.nameForSerialization('idLayoutStyle')
], IdCaptureOverlay.prototype, "_idLayoutStyle", void 0);
__decorate([
    Serializeable_1.nameForSerialization('idLayoutLineStyle')
], IdCaptureOverlay.prototype, "_idLayoutLineStyle", void 0);
exports.IdCaptureOverlay = IdCaptureOverlay;

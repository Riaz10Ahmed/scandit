"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
/// <amd-module name="scandit-cordova-datacapture-text.TextCapture+Related"/>
// ^ needed because Cordova can't resolve "../xx" style dependencies
const CapturedText_1 = require("scandit-cordova-datacapture-text.CapturedText");
const Cordova_1 = require("scandit-cordova-datacapture-text.Cordova");
const Feedback_1 = require("scandit-cordova-datacapture-core.Feedback");
const Serializeable_1 = require("scandit-cordova-datacapture-core.Serializeable");
const Viewfinder_1 = require("scandit-cordova-datacapture-core.Viewfinder");
class TextCaptureSession {
    get newlyCapturedTexts() {
        return this._newlyCapturedTexts;
    }
    get frameSequenceID() {
        return this._frameSequenceID;
    }
    static fromJSON(json) {
        const session = new TextCaptureSession();
        session._newlyCapturedTexts = json.newlyCapturedTexts
            .map(CapturedText_1.CapturedText.fromJSON);
        session._frameSequenceID = json.frameSequenceId;
        return session;
    }
}
exports.TextCaptureSession = TextCaptureSession;
class TextCaptureFeedback extends Serializeable_1.DefaultSerializeable {
    constructor() {
        super(...arguments);
        this.success = Feedback_1.Feedback.defaultFeedback;
    }
    static get default() {
        return new TextCaptureFeedback();
    }
}
exports.TextCaptureFeedback = TextCaptureFeedback;
class TextCaptureOverlay extends Serializeable_1.DefaultSerializeable {
    constructor() {
        super();
        this.type = 'textCapture';
        this._shouldShowScanAreaGuides = false;
        this._viewfinder = null;
        this._brush = TextCaptureOverlay.defaultBrush;
    }
    static get defaultBrush() {
        return new Viewfinder_1.Brush(Cordova_1.Cordova.defaults.TextCapture.TextCaptureOverlay.DefaultBrush.fillColor, Cordova_1.Cordova.defaults.TextCapture.TextCaptureOverlay.DefaultBrush.strokeColor, Cordova_1.Cordova.defaults.TextCapture.TextCaptureOverlay.DefaultBrush.strokeWidth);
    }
    get brush() {
        return this._brush;
    }
    set brush(newBrush) {
        this._brush = newBrush;
        this.textCapture.didChange();
    }
    get viewfinder() {
        return this._viewfinder;
    }
    set viewfinder(newViewfinder) {
        this._viewfinder = newViewfinder;
        this.textCapture.didChange();
    }
    get shouldShowScanAreaGuides() {
        return this._shouldShowScanAreaGuides;
    }
    set shouldShowScanAreaGuides(shouldShow) {
        this._shouldShowScanAreaGuides = shouldShow;
        this.textCapture.didChange();
    }
    static withTextCapture(textCapture) {
        return TextCaptureOverlay.withTextCaptureForView(textCapture, null);
    }
    static withTextCaptureForView(textCapture, view) {
        const overlay = new TextCaptureOverlay();
        overlay.textCapture = textCapture;
        if (view) {
            view.addOverlay(overlay);
        }
        return overlay;
    }
}
__decorate([
    Serializeable_1.ignoreFromSerialization
], TextCaptureOverlay.prototype, "textCapture", void 0);
__decorate([
    Serializeable_1.nameForSerialization('shouldShowScanAreaGuides')
], TextCaptureOverlay.prototype, "_shouldShowScanAreaGuides", void 0);
__decorate([
    Serializeable_1.serializationDefault(Viewfinder_1.NoViewfinder),
    Serializeable_1.nameForSerialization('viewfinder')
], TextCaptureOverlay.prototype, "_viewfinder", void 0);
__decorate([
    Serializeable_1.nameForSerialization('brush')
], TextCaptureOverlay.prototype, "_brush", void 0);
exports.TextCaptureOverlay = TextCaptureOverlay;

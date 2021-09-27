/// <amd-module name="scandit-cordova-datacapture-id.Cordova" />
import { Defaults } from './Defaults';
export declare const Cordova: {
    pluginName: string;
    defaults: Defaults;
    exec: (success: Function | null, error: Function | null, functionName: string, args: [any] | null) => void;
};
export declare enum CordovaFunction {
    SubscribeIdCaptureListener = "subscribeIdCaptureListener",
    ResetIdCapture = "resetIdCapture"
}

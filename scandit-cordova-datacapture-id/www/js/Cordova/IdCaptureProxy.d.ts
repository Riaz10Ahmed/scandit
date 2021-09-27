/// <amd-module name="scandit-cordova-datacapture-id.IdCaptureProxy" />
declare type IdCapture = any;
export declare class IdCaptureProxy {
    private static cordovaExec;
    private idCapture;
    static forIdCapture(idCapture: IdCapture): IdCaptureProxy;
    reset(): Promise<void>;
}
export {};

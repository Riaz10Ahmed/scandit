/// <amd-module name="scandit-cordova-datacapture-id.IdCaptureListenerProxy" />
declare type IdCapture = any;
export declare class IdCaptureListenerProxy {
    private static cordovaExec;
    private idCapture;
    static forIdCapture(idCapture: IdCapture): IdCaptureListenerProxy;
    private initialize;
    private subscribeListener;
    private notifyListeners;
}
export {};

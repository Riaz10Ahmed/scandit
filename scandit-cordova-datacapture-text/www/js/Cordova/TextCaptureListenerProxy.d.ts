/// <amd-module name="scandit-cordova-datacapture-text.TextCaptureListenerProxy" />
declare type TextCapture = any;
export declare class TextCaptureListenerProxy {
    private static cordovaExec;
    private textCapture;
    static forTextCapture(textCapture: TextCapture): TextCaptureListenerProxy;
    private initialize;
    private subscribeListener;
    private notifyListeners;
}
export {};

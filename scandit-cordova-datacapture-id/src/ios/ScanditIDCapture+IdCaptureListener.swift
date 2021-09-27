import ScanditIdCapture

extension ScanditIdCapture: IdCaptureListener {
    public func idCapture(_ idCapture: IdCapture,
                          didCaptureIn session: IdCaptureSession,
                          frameData: FrameData) {
        guard let callback = callbacks.idCaptureListener else {
            return
        }

        let listenerEvent = ListenerEvent(name: .didCaptureInIdCapture,
                                          argument: ["session": session.jsonString],
                                          shouldNotifyWhenFinished: true)
        waitForFinished(listenerEvent, callbackId: callback.id)
        finishBlockingCallback(with: idCapture, for: listenerEvent)
    }

    public func idCapture(_ idCapture: IdCapture,
                          didFailWithError error: Error,
                          session: IdCaptureSession,
                          frameData: FrameData) {
        guard let callback = callbacks.idCaptureListener else {
            return
        }

        let event = ListenerEvent(name: .didFailInIdCapture,
                                  argument: ["session": session.jsonString])
        commandDelegate.send(.listenerCallback(event), callbackId: callback.id)
    }
}

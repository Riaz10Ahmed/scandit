import ScanditIdCapture

extension ScanditIdCapture: IdCaptureDeserializerDelegate {
    public func idCaptureDeserializer(_ deserializer: IdCaptureDeserializer,
                                      didStartDeserializingMode mode: IdCapture,
                                      from JSONValue: JSONValue) {
    }

    public func idCaptureDeserializer(_ deserializer: IdCaptureDeserializer,
                                      didFinishDeserializingMode mode: IdCapture,
                                      from JSONValue: JSONValue) {
        idCapture = mode

        mode.isEnabled = JSONValue.bool(forKey: "enabled")

        mode.addListener(self)
    }

    public func idCaptureDeserializer(_ deserializer: IdCaptureDeserializer,
                                      didStartDeserializingSettings settings: IdCaptureSettings,
                                      from JSONValue: JSONValue) {
    }

    public func idCaptureDeserializer(_ deserializer: IdCaptureDeserializer,
                                      didFinishDeserializingSettings settings: IdCaptureSettings,
                                      from JSONValue: JSONValue) {
    }

    public func idCaptureDeserializer(_ deserializer: IdCaptureDeserializer,
                                      didStartDeserializingOverlay overlay: IdCaptureOverlay,
                                      from JSONValue: JSONValue) {
    }

    public func idCaptureDeserializer(_ deserializer: IdCaptureDeserializer,
                                      didFinishDeserializingOverlay overlay: IdCaptureOverlay,
                                      from JSONValue: JSONValue) {
    }
}

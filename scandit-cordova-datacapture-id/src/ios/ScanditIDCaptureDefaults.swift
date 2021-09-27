import ScanditIdCapture

struct ScanditIdCaptureDefaults: Encodable {
    typealias CameraSettingsDefaults = ScanditCaptureCoreDefaults.CameraSettingsDefaults

    struct IdCaptureDefaultsContainer: Encodable {
        let RecommendedCameraSettings: CameraSettingsDefaults
    }

    let IdCapture = IdCaptureDefaultsContainer()
}

extension ScanditIdCaptureDefaults.IdCaptureDefaultsContainer {
    init() {
        self.RecommendedCameraSettings = ScanditCaptureCoreDefaults.CameraSettingsDefaults
            .from(IdCapture.recommendedCameraSettings)
    }
}

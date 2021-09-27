/// <amd-module name="scandit-cordova-datacapture-id.Defaults" />
import { CameraSettings } from 'Camera+Related';
import { CameraSettingsDefaultsJSON } from 'CoreDefaults';
export interface Defaults {
    IdCapture: {
        RecommendedCameraSettings: CameraSettings;
    };
}
export interface DefaultsJSON {
    IdCapture: {
        RecommendedCameraSettings: CameraSettingsDefaultsJSON;
    };
}
export declare const defaultsFromJSON: (json: DefaultsJSON) => Defaults;

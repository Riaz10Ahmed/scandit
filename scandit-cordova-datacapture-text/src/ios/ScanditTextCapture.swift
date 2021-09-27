import ScanditTextCapture

class TextCaptureCallbacks {
    var textCaptureListener: Callback?

    func reset() {
        textCaptureListener = nil
    }
}

struct TextCaptureCallbackResult: BlockingListenerCallbackResult {
    struct ResultJSON: Decodable {
        let enabled: Bool?
    }

    let finishCallbackID: ListenerEvent.Name
    let result: ResultJSON?

    var enabled: Bool? {
        guard let result = result else {
            return nil
        }

        return result.enabled
    }
}

@objc(ScanditTextCapture)
public class ScanditTextCapture: CDVPlugin, DataCapturePlugin {

    lazy var modeDeserializers: [DataCaptureModeDeserializer] = {
        let textCaptureDeserializer = TextCaptureDeserializer()
        textCaptureDeserializer.delegate = self
        return [textCaptureDeserializer]
    }()

    lazy var componentDeserializers: [DataCaptureComponentDeserializer] = []
    lazy var components: [DataCaptureComponent] = []

    lazy var callbacks = TextCaptureCallbacks()
    lazy var callbackLocks = CallbackLocks()

    override public func pluginInitialize() {
        super.pluginInitialize()
        ScanditCaptureCore.dataCapturePlugins.append(self)
    }

    public override func onReset() {
        super.onReset()

        callbacks.reset()
        callbackLocks.releaseAll()
    }

    // MARK: Listeners

    @objc(subscribeTextCaptureListener:)
    func subscribeTextCaptureListener(command: CDVInvokedUrlCommand) {
        callbacks.textCaptureListener?.dispose(by: commandDelegate)
        callbacks.textCaptureListener = Callback(id: command.callbackId)
        commandDelegate.send(.keepCallback, callbackId: command.callbackId)
    }

    // MARK: Defaults

    @objc(getDefaults:)
    func getDefaults(command: CDVInvokedUrlCommand) {
        guard let settings = try? TextCaptureSettings(jsonString: "{}") else {
            fatalError("Could not create default text capture settings, so defaults can not be created")
        }

        let textCapture = TextCapture(context: nil, settings: settings)
        let overlay = TextCaptureOverlay(textCapture: textCapture)

        let defaults = ScanditTextCaptureDefaults(textCaptureSettings: settings, overlay: overlay)

        commandDelegate.send(.success(message: defaults), callbackId: command.callbackId)
    }

    @objc(finishCallback:)
    func finishCallback(command: CDVInvokedUrlCommand) {
        guard let result = TextCaptureCallbackResult.from(command) else {
            commandDelegate.send(.failure(with: .invalidJSON), callbackId: command.callbackId)
            return
        }
        callbackLocks.setResult(result, for: result.finishCallbackID)
        callbackLocks.release(for: result.finishCallbackID)
        commandDelegate.send(.success, callbackId: command.callbackId)
    }

    func waitForFinished(_ listenerEvent: ListenerEvent, callbackId: String) {
        callbackLocks.wait(for: listenerEvent.name, afterDoing: {
            commandDelegate.send(.listenerCallback(listenerEvent), callbackId: callbackId)
        })
    }

    func finishBlockingCallback(with mode: DataCaptureMode, for listenerEvent: ListenerEvent) {
        defer {
            callbackLocks.clearResult(for: listenerEvent.name)
        }

        guard let result = callbackLocks.getResult(for: listenerEvent.name) as? TextCaptureCallbackResult,
            let enabled = result.enabled else {
            return
        }

        if enabled != mode.isEnabled {
            mode.isEnabled = enabled
        }
    }
}

import ScanditIdCapture

class IdCaptureCallbacks {
    var idCaptureListener: Callback?

    func reset() {
        idCaptureListener = nil
    }
}

struct IdCaptureCallbackResult: BlockingListenerCallbackResult {
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

@objc(ScanditIdCapture)
public class ScanditIdCapture: CDVPlugin, DataCapturePlugin {

    lazy var modeDeserializers: [DataCaptureModeDeserializer] = {
        let idCaptureDeserializer = IdCaptureDeserializer()
        idCaptureDeserializer.delegate = self
        return [idCaptureDeserializer]
    }()

    lazy var componentDeserializers: [DataCaptureComponentDeserializer] = []
    lazy var components: [DataCaptureComponent] = []

    lazy var callbacks = IdCaptureCallbacks()
    lazy var callbackLocks = CallbackLocks()

    var idCapture: IdCapture?

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

    @objc(subscribeIdCaptureListener:)
    func subscribeIdCaptureListener(command: CDVInvokedUrlCommand) {
        callbacks.idCaptureListener?.dispose(by: commandDelegate)
        callbacks.idCaptureListener = Callback(id: command.callbackId)
        commandDelegate.send(.keepCallback, callbackId: command.callbackId)
    }

    @objc(finishCallback:)
    func finishCallback(command: CDVInvokedUrlCommand) {
        guard let result = IdCaptureCallbackResult.from(command) else {
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

        guard let result = callbackLocks.getResult(for: listenerEvent.name) as? IdCaptureCallbackResult,
            let enabled = result.enabled else {
            return
        }

        if enabled != mode.isEnabled {
            mode.isEnabled = enabled
        }
    }

    // MARK: Defaults

    @objc(getDefaults:)
    func getDefaults(command: CDVInvokedUrlCommand) {
        let defaults = ScanditIdCaptureDefaults()
        commandDelegate.send(.success(message: defaults), callbackId: command.callbackId)
    }

    // MARK: Reset

    @objc(resetIdCapture:)
    func resetIdCapture(command: CDVInvokedUrlCommand) {
        if let idCapture = idCapture {
            idCapture.reset()
        }
        commandDelegate.send(.success, callbackId: command.callbackId)
    }
}

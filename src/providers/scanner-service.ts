import { Injectable, NgZone } from '@angular/core';

declare let window:any;

@Injectable()
export class ScannerServiceProvider {
  public contentHeight;
//   public delegate: ScannerDelegate;
  public IdCapture;
  public session;
  private context;
  private camera;
  private settings;
  private view;
  private overlay;

  constructor(
    private zone: NgZone,
  ) {
    this.context = Scandit.DataCaptureContext.forLicenseKey('AUvAFDfbF+eiK9JcbT7/434ZHod3L9ecemcutSFSkZ3LJUQhhRvaL4Z1QGxJTUdIy1Aj6A1kuTO+QQnvukNy1D0YUDPNU1oKXiDhrzlynJxbZIGM6iBflGFKB+PDVy0xgkGdaYFhIJVaAjPi/0Hv4yA+0NOaTciIp3hHd3wlJoK+bHsffVykNUl7bP2Pb9bFL2sGLHZKknzpea6gCHMqhlooy7MoZK1DFChnyldmnMNRFRvIWBifeDEgiTLmV3E3oEMERwNQqD4oRoIzCkz8NVBbYul9TpGkD2bRe6dUMooaYZBLE1YkKLcJsgz8VE6Kv2LbOwhj7n+AWP1n40vrIbgxaFyhQsLFDWc+zPFRXTwsENSIhGybe1diyiyvQHzCkXggm6h50A6gUJOMy3x546BdtALwQLIaMC51Yds1L/r7dfBns38b3MxkQE9hFxUS2k9awSdwYjBJFQdtUxEEyAx1XyRzQ6cfQmSIIcNnBzcwW68OYUcSF0ooFIfddvZZJ2zZXEN05enUT/Qq636YuzhZKtsOe5uCWEWJfWAO73u7InUqPn1b4HoUvjGytK+yca1+cK5h8SATElPv+iV9uXicWX31k7OK5re3EYd63M3/9vh3h5VMDs5BfY8L4vu9KDIaFxlOvB+RvBeSQfzsJuQ/pVlRtaoWGY+RaLt+nxc13M6rdPPoqMFDj8ZmGCEBiMk3M9eWG0SWGu4IMcjT9iUlSRQ9rj/GSOaZQ33eguGiEfdLMLRwmuBvjPjbx57p2vE3vW5gl8yN/k7Bjk8BrlhUGnfENcrfGv8iMjaHwN7HyHPxZyLsQwjli5D8QIpSllK/YPIvebpvX6LiGOhQKYa7Gr5e7aoWlBNRmNNavI+5nG+V4f8FxAeXPT+AhDE+mmM5HL86B8/bj/yfSLyROJyKNv6Vg3YsFLOUtiYG6XVL7P1UhAD6HvrI4IvFzrdVZcqxM5/nwml8tRgytYFBDE2kJ+qgh2ZiCCFP/bvhwmwKZFWwGZPxK7Cebw9d0JX4MLKCJPuh/mkB+4FmNAqndbcTt7fTSspzW1b2QN6ZGLK6em1jz0buENgrSEF5HzR5SqnCdggkfsqn7153rMEuQRg5LZ1aV763ZEvxqBTUG/enkNJqRNGn50GQ3PdLoH5cbyJUZCwj1qO2hvsamWS7E2ECmMl8ZTekBoXzxmZg+5zeXe+bV/K4Jruvws79Kh0KiIf1E8uu2VdJNrEikqcV7mP/2kqQb/bntWHgx4U=');
    this.camera = Scandit.Camera.default;
    this.context.setFrameSource(this.camera);

    this.camera.applySettings(Scandit.IdCapture.recommendedCameraSettings);
    this.settings = new Scandit.IdCaptureSettings();
  
    this.settings.supportedDocuments = [
      Scandit.IdDocumentType.IdCardVIZ,
      Scandit.IdDocumentType.AAMVABarcode,
      Scandit.IdDocumentType.DLVIZ,
    ]
}

public start(): void {
  this.view = Scandit.DataCaptureView.forContext(this.context);
  this.view.connectToElement(document.getElementById('data-capture-view'));
  this.camera.switchToDesiredState(Scandit.FrameSourceState.On);
  window.idCapture = Scandit.IdCapture.forContext(this.context, this.settings);

  window.idCapture.addListener({
      didCaptureId: (_, session) => {
        if (session.newlyCapturedId == null) {
          return
        }
  
        window.idCapture.isEnabled = false;
  
        if (session.newlyCapturedId.mrzResult != null) {
          window.showResult(window.descriptionForMrzResult(session.newlyCapturedId));
        } else if (session.newlyCapturedId.vizResult != null) {
          window.showResult(window.descriptionForVizResult(session.newlyCapturedId));
        } else if (session.newlyCapturedId.aamvaBarcodeResult != null) {
          window.showResult(window.descriptionForUsDriverLicenseBarcodeResult(session.newlyCapturedId));
        } else if (session.newlyCapturedId.usUniformedServicesBarcodeResult != null) {
          window.showResult(window.descriptionForUsUniformedServicesBarcodeResult(session.newlyCapturedId));
        }
      },
      didFailWithError: (_, error, session) => {
        window.showResult(error.message);
      }
    });

    window.idCaptureOverlay = Scandit.IdCaptureOverlay.withIdCaptureForView(window.idCapture, this.view);
    window.idCaptureOverlay.idLayoutStyle = Scandit.IdLayoutStyle.Square;
  
    window.idCapture.isEnabled = true;

    window.showResult = result => {
      const resultElement = document.createElement('div');
      resultElement.id = "result";
      // resultElement.classList = "result";
      resultElement.innerHTML = `<p>${result}</p><button onclick="continueScanning()">OK</button>`;
      document.querySelector('#data-capture-view').appendChild(resultElement)
    }
    
    window.continueScanning = () => {
      document.querySelector('#result').parentElement.removeChild(document.querySelector('#result'))
      window.idCapture.isEnabled = true;
    }

    window.descriptionForCapturedId = (result) => {
      return `
      Name: ${result.firstName || "empty"}<br>
      Last Name: ${result.lastName || "empty"}<br>
      Full Name: ${result.fullName}<br>
      Sex: ${result.sex || "empty"}<br>
      Date of Birth: ${JSON.stringify(result.dateOfBirth && result.dateOfBirth.date) || "empty"}<br>
      Nationality: ${result.nationality || "empty"}<br>
      Address: ${result.address || "empty"}<br>
      Document Type: ${result.documentType}<br>
      Captured Result Type: ${result.capturedResultType}<br>
      Issuing Country: ${result.issuingCountry || "empty"}<br>
      Issuing Country ISO: ${result.issuingCountryISO || "empty"}<br>
      Document Number: ${result.documentNumber || "empty"}<br>
      Date of Expiry: ${JSON.stringify(result.dateOfExpiry && result.dateOfExpiry.date) || "empty"}<br>
      Date of Issue: ${JSON.stringify(result.dateOfIssue && result.dateOfIssue.date) || "empty"}<br>
      `
    }
}
 
}
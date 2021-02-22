import { Component, ElementRef, ViewChild } from "@angular/core";
import { LoadingController, ModalController, Platform } from "@ionic/angular";
import jsQr from "jsqr";

@Component({
  selector: "app-cameramodal",
  templateUrl: "./cameramodal.component.html",
  styleUrls: ["./cameramodal.component.scss"],
})
export class CameramodalComponent {
  @ViewChild("video") video: ElementRef;
  @ViewChild("canvas") canvas: ElementRef;

  scanActive = false;
  canvasElement: any;
  canvasContext: any;
  videoElement: any;
  scanResult = null;
  loading: HTMLIonLoadingElement = null;

  constructor(
    private platform: Platform,
    private loadingController: LoadingController,
    private modalController: ModalController
  ) {
    const isInStandaloneMode = () =>
      "standalone" in window.navigator && window.navigator["standalone"];
    if (this.platform.is("ios") && isInStandaloneMode) {
      console.log("ios pwa mode");
    }
  }

  ngAfterViewInit() {
    this.canvasElement = this.canvas.nativeElement;
    this.canvasContext = this.canvasElement.getContext("2d");
    this.videoElement = this.video.nativeElement;
    this.startScan();
  }

  private async startScan() {
    const stream = await navigator.mediaDevices.getUserMedia({
      video: {
        facingMode: "environment",
      },
    });

    this.videoElement.srcObject = stream;
    // required in safari
    // this.videoElement.setAttribute("playsinline", true);

    this.loading = await this.loadingController.create({});
    await this.loading.present();

    this.videoElement.play();
    requestAnimationFrame(this.scan.bind(this));
  }

  private async scan() {
    if (this.videoElement.readyState === this.videoElement.HAVE_ENOUGH_DATA) {
      if (this.loading) {
        await this.loading.dismiss();
        this.loading = null;
        this.scanActive = true;
      }

      this.canvasElement.height = this.videoElement.videoHeight;
      this.canvasElement.width = this.videoElement.videoWidth;

      this.canvasContext.drawImage(
        this.videoElement,
        0,
        0,
        this.canvasElement.width,
        this.canvasElement.height
      );

      const imageData = this.canvasContext.getImageData(
        0,
        0,
        this.canvasElement.width,
        this.canvasElement.height
      );
      const code = jsQr(imageData.data, imageData.width, imageData.height, {
        inversionAttempts: "dontInvert",
      });

      if (code) {
        this.scanActive = false;
        this.videoElement.srcObject = null;
        await this.modalController.dismiss(code.data);
      } else {
        if (this.scanActive) {
          requestAnimationFrame(this.scan.bind(this));
        }
      }
    } else {
      requestAnimationFrame(this.scan.bind(this));
    }
  }

  private calculateSize(srcSize, dstSize) {
    const srcRatio = srcSize.width / srcSize.height;
    const dstRatio = dstSize.width / dstSize.height;

    if (dstRatio > srcRatio) {
      return {
        width: dstSize.height * srcRatio,
        height: dstSize.height,
      };
    } else {
      console.log("dstRatio", dstRatio);
      console.log("srcRatio", srcRatio);
      return {
        width: dstSize.width,
        height: dstSize.width / srcRatio,
      };
    }
  }
}

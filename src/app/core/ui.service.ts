import { Injectable } from "@angular/core";
import {
  AlertController,
  AnimationController,
  LoadingController,
  Platform,
  ToastController,
} from "@ionic/angular";
import {
  webAnimation,
  mobileAnimation,
} from "src/app/animations/card-animation";

@Injectable({
  providedIn: "root",
})
export class UiService {
  private anim: any;

  constructor(
    private loadingController: LoadingController,
    private animationCtrl: AnimationController,
    private platform: Platform,
    private toastController: ToastController,
    private alertController: AlertController
  ) {
    if (this.platform.width() <= 1281) {
      this.anim = mobileAnimation;
    } else {
      this.anim = webAnimation;
    }
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: "Alert",
      message: "Registration Succesfull.",
      buttons: ["OK"],
    });
    return await alert;
  }

  async presentToast(message: string, color?: string, cssClass?: string) {
    const toast = await this.toastController.create({
      message,
      color,
      cssClass,
      position: "top",
      duration: 2000,
    });
    toast.present();
  }

  async presentLoading() {
    const loading = await this.loadingController.create({
      duration: 2000,
      message:
        '<div class="loading-img"></div><img src="/assets/img/A.png" alt="loading..."></img>',
      translucent: true,
      spinner: null,
      cssClass: "custom-loading",
    });
    await loading.present();
    // this.router.navigate(["/dashboard"]);
  }

  signUp(document1: any, document2: any) {
    this.animationCtrl
      .create()
      .addAnimation([
        this.anim.slideOut(document1).afterStyles({
          "z-index": "0",
        }),
        this.anim.slideIn(document2).beforeStyles({
          "z-index": "10",
        }),
      ])
      .play();
  }

  closeCard(document1: any, document2: any) {
    this.animationCtrl
      .create()
      .addAnimation([
        this.anim.slideOut(document1),
        this.anim.fadeIn(document2),
      ])
      .play();
  }
}

import { Component } from "@angular/core";

import { ModalController, Platform } from "@ionic/angular";
import { SplashScreen } from "@ionic-native/splash-screen/ngx";
import { StatusBar } from "@ionic-native/status-bar/ngx";
import { QrmodalComponent } from "./components/qrmodal/qrmodal.component";
import { Router } from "@angular/router";
@Component({
  selector: "app-root",
  templateUrl: "app.component.html",
  styleUrls: ["app.component.scss"],
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private modalController: ModalController,
    private router: Router
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  async showQr() {
    const modal = await this.modalController.create({
      component: QrmodalComponent,
      cssClass: "qr-modal",
    });

    await modal.present();
  }

  signOut() {
    this.router.navigate(["/"], { replaceUrl: true });
  }
}

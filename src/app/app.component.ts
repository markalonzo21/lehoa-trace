import { Component } from "@angular/core";

import { MenuController, ModalController, Platform } from "@ionic/angular";
import { SplashScreen } from "@ionic-native/splash-screen/ngx";
import { StatusBar } from "@ionic-native/status-bar/ngx";
import { QrmodalComponent } from "./components/qrmodal/qrmodal.component";
import { Router } from "@angular/router";
import { AuthService } from "./core/auth.service";
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
    private router: Router,
    private menuController: MenuController,
    private authService: AuthService
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.menuController.enable(false);

      // check user state
      this.authService.userstate().subscribe((state) => {
        if (this.authService.isLogedIn()) {
          this.router.navigate(["/dashboard"]);
        } else {
          this.router.navigate(["/"]);
        }
      });
    });
  }

  ionViewWillEnter() {
    this.menuController.enable(false);
  }

  async showQr() {
    const modal = await this.modalController.create({
      component: QrmodalComponent,
      cssClass: "qr-modal",
    });

    await modal.present();
  }

  async signOut() {
    await this.menuController.toggle();
    await this.menuController.enable(false);
    await this.authService.logout();
    this.router.navigate(["/"]);
  }
}

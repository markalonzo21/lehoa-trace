import { Component, ElementRef, ViewChild } from "@angular/core";
import { AnimationController, ModalController, Platform } from "@ionic/angular";
import { webAnimation, mobileAnimation } from "../animations/card-animation";
import { VehiclemodalComponent } from "../components/vehiclemodal/vehiclemodal.component";
@Component({
  selector: "app-home",
  templateUrl: "home.page.html",
  styleUrls: ["home.page.scss"],
})
export class HomePage {
  @ViewChild("cards") cards: ElementRef;
  @ViewChild("btns") btns: ElementRef;
  @ViewChild("logoImg") logo: ElementRef;

  isRegisterCard = false;
  imgSrc = "";
  private anim;

  constructor(
    private animationCtrl: AnimationController,
    private platform: Platform,
    private modalController: ModalController
  ) {}

  async ionViewWillEnter() {
    await this.platform.ready();
    if (this.platform.width() <= 1281) {
      let logo = this.logo.nativeElement;
      this.imgSrc = "assets/img/mobile-logo.png";
      // set animations
      this.anim = mobileAnimation;
    } else {
      this.imgSrc = "assets/img/LEHOA LOGO WITH TEXT.png";
      this.anim = webAnimation;
    }
  }

  async showLoginCard() {
    document.querySelector("register-card").setAttribute("style", "z-index: 0");
    await this.anim.fadeOut(this.btns.nativeElement).play();
    await this.anim.slideIn(document.querySelector("login-card")).play();
  }

  async showResidenceCard() {
    // document.querySelector("login-card").setAttribute("style", "display:none");
    await this.anim.fadeOut(this.btns.nativeElement).play();
    await this.anim.slideIn(document.querySelector("register-card")).play();
  }

  async showMerchantCard() {
    await this.anim.fadeOut(this.btns.nativeElement).play();
    await this.anim.slideIn(document.querySelector("merchant-card")).play();
  }

  async showVehicleModal() {
    const modal = await this.modalController.create({
      component: VehiclemodalComponent,
      cssClass: "qr-modal",
    });

    await modal.present();
  }

  // animate card
  async animate() {
    // this.registerCard.setAttribute("style", "display:none");
    // await fadeOut(this.btns.nativeElement).play();
    // await slideIn(document.querySelector("login-card")).play();
  }
}

import { Component, ElementRef, ViewChild } from "@angular/core";
import { AnimationController } from "@ionic/angular";
import { slideIn, fadeOut } from "../animations/card-animation";
@Component({
  selector: "app-home",
  templateUrl: "home.page.html",
  styleUrls: ["home.page.scss"],
})
export class HomePage {
  @ViewChild("cards") cards: ElementRef;
  @ViewChild("btns") btns: ElementRef;

  isRegisterCard = false;

  constructor(private animationCtrl: AnimationController) {}

  async showLoginCard() {
    document
      .querySelector("register-card")
      .setAttribute("style", "display:none");
    await fadeOut(this.btns.nativeElement).play();
    await slideIn(document.querySelector("login-card")).play();
  }

  async showResidenceCard() {
    document.querySelector("login-card").setAttribute("style", "display:none");
    await fadeOut(this.btns.nativeElement).play();
    await slideIn(document.querySelector("register-card")).play();
  }

  showMerchantCard() {
    // this.isRegisterCard = true;
    // this.animate();
  }

  showVehicleCard() {
    // this.isRegisterCard = true;
    // this.animate();
  }

  // animate card
  async animate() {
    // this.registerCard.setAttribute("style", "display:none");
    // await fadeOut(this.btns.nativeElement).play();
    // await slideIn(document.querySelector("login-card")).play();
  }
}

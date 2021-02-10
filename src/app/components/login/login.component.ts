import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import {
  AnimationController,
  LoadingController,
  Platform,
} from "@ionic/angular";
import {
  webAnimation,
  mobileAnimation,
} from "src/app/animations/card-animation";

@Component({
  selector: "login-card",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit {
  private anim: any;
  constructor(
    private animationCtrl: AnimationController,
    private loadingController: LoadingController,
    private router: Router,
    private platform: Platform
  ) {
    if (this.platform.width() <= 600) {
      this.anim = mobileAnimation;
    } else {
      this.anim = webAnimation;
    }
  }

  ngOnInit() {}

  login() {
    this.presentLoading();
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
    this.router.navigate(["/dashboard"]);
  }

  signUp() {
    this.animationCtrl
      .create()
      .addAnimation([
        this.anim.slideOut(document.querySelector("login-card")).afterStyles({
          "z-index": "0",
        }),
        this.anim
          .slideIn(document.querySelector("register-card"))
          .beforeStyles({
            "z-index": "10",
          }),
      ])
      .play();
  }

  closeCard() {
    console.log(document.querySelector(".btns"));
    this.animationCtrl
      .create()
      .addAnimation([
        this.anim.slideOut(document.querySelector("login-card")),
        this.anim.fadeIn(document.querySelector(".btns")),
      ])
      .play();
  }
}

import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AnimationController, LoadingController } from "@ionic/angular";
import { slideIn, slideOut } from "src/app/animations/card-animation";

@Component({
  selector: "login-card",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit {
  constructor(
    private animationCtrl: AnimationController,
    private loadingController: LoadingController,
    private router: Router
  ) {}

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
        slideOut(document.querySelector("login-card")).afterStyles({
          display: "none",
          "z-index": "0",
        }),
        slideIn(document.querySelector("register-card")).beforeStyles({
          display: "block",
          "z-index": "10",
        }),
      ])
      .play();
  }
}

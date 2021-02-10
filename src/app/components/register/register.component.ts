import { Component, ElementRef, OnInit } from "@angular/core";
import { AnimationController, Platform } from "@ionic/angular";
import {
  webAnimation,
  mobileAnimation,
} from "src/app/animations/card-animation";

@Component({
  selector: "register-card",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.scss"],
})
export class RegisterComponent implements OnInit {
  private anim: any;

  constructor(
    private animationCtrl: AnimationController,
    private platform: Platform
  ) {
    if (platform.width() <= 600) {
      this.anim = mobileAnimation;
    } else {
      this.anim = webAnimation;
    }
  }

  ngOnInit() {}

  register() {}

  signIn() {
    this.animationCtrl
      .create()
      .addAnimation([
        this.anim
          .slideOut(document.querySelector("register-card"))
          .afterStyles({
            "z-index": "0",
          }),
        this.anim.slideIn(document.querySelector("login-card")).beforeStyles({
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
        this.anim.slideOut(document.querySelector("register-card")),
        this.anim.fadeIn(document.querySelector(".btns")),
      ])
      .play();
  }
}

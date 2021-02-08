import { Component, ElementRef, OnInit } from "@angular/core";
import { AnimationController } from "@ionic/angular";
import { slideIn, slideOut } from "src/app/animations/card-animation";

@Component({
  selector: "register-card",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.scss"],
})
export class RegisterComponent implements OnInit {
  constructor(private animationCtrl: AnimationController) {}

  ngOnInit() {}

  signIn() {
    this.animationCtrl
      .create()
      .addAnimation([
        slideOut(document.querySelector("register-card")).afterStyles({
          display: "none",
          "z-index": "0",
        }),
        slideIn(document.querySelector("login-card")).beforeStyles({
          display: "block",
          "z-index": "10",
        }),
      ])
      .play();
  }
}

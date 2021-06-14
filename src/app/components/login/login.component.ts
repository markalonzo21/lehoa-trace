import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "src/app/core/auth.service";
import { UiService } from "src/app/core/ui.service";

@Component({
  selector: "login-card",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent {
  username: string = "";
  password: string = "";
  merchant: boolean = false;
  constructor(
    private router: Router,
    private uiService: UiService,
    private auth: AuthService
  ) {}

  login() {
    if (this.username !== "" && this.password !== "") {
      this.auth.login(this.username, this.password, this.merchant).subscribe(
        () => {
          this.username = "";
          this.password = "";
          this.router.navigate(["/dashboard"], { replaceUrl: true });
        },
        (err) => {
          console.log(err);
          this.uiService.presentToast(err, "danger");
        }
      );
    } else {
      this.uiService.presentToast("Username and password required", "danger");
    }
  }

  signUp() {
    this.uiService.signUp(
      document.querySelector("login-card"),
      document.querySelector("register-card")
    );
  }

  closeCard() {
    this.uiService.closeCard(
      document.querySelector("login-card"),
      document.querySelector(".btns")
    );
  }
}

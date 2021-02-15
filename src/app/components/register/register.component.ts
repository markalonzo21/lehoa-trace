import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AnimationController, ModalController, Platform } from "@ionic/angular";
import { UiService } from "src/app/core/ui.service";
import { UserService } from "src/app/core/user.service";
import { NotificationComponent } from "../notification/notification.component";

@Component({
  selector: "register-card",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.scss"],
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;

  constructor(
    private animationCtrl: AnimationController,
    private platform: Platform,
    private formBuilder: FormBuilder,
    private uiService: UiService,
    private userService: UserService,
    private modalController: ModalController
  ) {
    this.registerForm = this.formBuilder.group({
      firstname: ["", Validators.required],
      lastname: ["", Validators.required],
      middlename: ["", Validators.required],
      suffix: [""],
      bdate: ["", Validators.required],
      email: ["", Validators.compose([Validators.required, Validators.email])],
      contact: ["", Validators.required],
      username: ["", Validators.required],
      password: [
        "",
        Validators.compose([Validators.required, Validators.minLength(6)]),
      ],
    });
  }

  ngOnInit() {}

  register() {
    this.userService.register(this.registerForm.value).subscribe(
      (data) => {
        this.registerForm.reset();
        this.presentModal(data);
      },
      (err) => {
        this.uiService.presentToast(err, "danger");
      },
      () => {
        this.registerForm.reset();
        // this.uiService.presentAlert().then(async (alert) => {
        //   await alert.present();
        //   alert.onDidDismiss().then(() => this.closeCard());
        // });
      }
    );
  }

  validateEmail(ev) {
    if (this.registerForm.get("email").errors === null) {
      this.userService.validateEmail({ email: ev.target.value }).subscribe(
        () => {},
        (error) => {
          this.uiService.presentToast(error, "danger");
        }
      );
    }
  }

  async presentModal(data: any) {
    const modal = await this.modalController.create({
      component: NotificationComponent,
      componentProps: { data },
    });

    await modal.present();
  }

  signIn() {
    this.uiService.signUp(
      document.querySelector("register-card"),
      document.querySelector("login-card")
    );
  }

  closeCard() {
    this.uiService.closeCard(
      document.querySelector("register-card"),
      document.querySelector(".btns")
    );
  }
}

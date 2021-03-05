import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MenuController } from "@ionic/angular";
import { AuthService } from "../core/auth.service";
import { MerchantService } from "../core/merchant.service";
import { UiService } from "../core/ui.service";
import { UserService } from "../core/user.service";

@Component({
  selector: "app-profile",
  templateUrl: "./profile.page.html",
  styleUrls: ["./profile.page.scss"],
})
export class ProfilePage implements OnInit {
  user: any;
  readOnly = true;
  userForm: FormGroup;
  constructor(
    private menuController: MenuController,
    private authService: AuthService,
    private fb: FormBuilder,
    private userService: UserService,
    private merchantService: MerchantService,
    private uiService: UiService
  ) {}

  async updateProfile() {
    let userType = await this.authService.getloginType();
    if (userType === "user") {
      this.userService.updateUser(this.user._id, this.userForm.value).subscribe(
        (data) => {
          this.authService.updateUser(data);
          this.uiService.presentToast("Profile updated ", "success");
        },
        (err) => {
          this.uiService.presentToast("Error: Profile not updated", "danger");
        }
      );
    } else {
      this.merchantService
        .updateUser(this.user._id, this.userForm.value)
        .subscribe(
          (data) => {
            this.authService.updateUser(data);
            this.uiService.presentToast("Profile updated ", "success");
          },
          (err) => {
            this.uiService.presentToast("Error: Profile not updated", "danger");
          }
        );
    }
    this.readOnly = true;
  }

  async ngOnInit() {
    this.user = await this.authService.getUser();
    this.userForm = this.fb.group({
      contact: [this.user.contact, Validators.required],
      address: [this.user?.address],
      email: [
        this.user.email,
        Validators.compose([Validators.required, Validators.email]),
      ],
      username: [this.user.username, Validators.required],
    });
  }

  ionViewWillEnter() {
    this.menuController.toggle();
  }
}

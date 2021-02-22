import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ModalController } from "@ionic/angular";
import { MerchantService } from "src/app/core/merchant.service";
import { UiService } from "src/app/core/ui.service";
import { NotificationComponent } from "../notification/notification.component";

@Component({
  selector: "merchant-card",
  templateUrl: "./merchant.component.html",
  styleUrls: ["./merchant.component.scss"],
})
export class MerchantComponent implements OnInit {
  merchantForm: FormGroup;

  constructor(
    private uiService: UiService,
    private formBuilder: FormBuilder,
    private modalController: ModalController,
    private merchantService: MerchantService
  ) {
    this.merchantForm = this.formBuilder.group({
      firstname: ["", Validators.required],
      lastname: ["", Validators.required],
      middlename: ["", Validators.required],
      suffix: [""],
      gender: ["male", Validators.required],
      company_name: ["", Validators.required],
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
    this.merchantService.register(this.merchantForm.value).subscribe(
      (data) => {
        this.merchantForm.reset();
        this.presentModal(data);
      },
      (err) => {
        this.uiService.presentToast(err, "danger");
      },
      () => {
        this.merchantForm.reset();
      }
    );
  }

  validateEmail(ev) {
    if (this.merchantForm.get("email").errors === null) {
      this.merchantService.validateEmail({ email: ev.target.value }).subscribe(
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

  closeCard() {
    this.uiService.closeCard(
      document.querySelector("merchant-card"),
      document.querySelector(".btns")
    );
  }
}

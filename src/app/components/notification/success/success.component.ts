import { Component, Input, OnInit } from "@angular/core";
import { ModalController } from "@ionic/angular";
import { UiService } from "src/app/core/ui.service";
import { UserService } from "src/app/core/user.service";

@Component({
  selector: "app-success",
  templateUrl: "./success.component.html",
  styleUrls: ["./success.component.scss"],
})
export class SuccessComponent implements OnInit {
  @Input() data: any;
  address: string;

  constructor(
    private userService: UserService,
    private uiService: UiService,
    private modalController: ModalController
  ) {}

  ngOnInit() {}

  deliver() {
    this.userService
      .updateAddress({ _id: this.data._id, address: this.address })
      .subscribe((msg: any) => {
        this.uiService.presentToast(msg.message, "success");
      });
  }

  dismiss() {
    this.modalController.dismiss();
  }
}

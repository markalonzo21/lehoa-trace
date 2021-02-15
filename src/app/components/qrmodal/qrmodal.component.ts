import { Component, OnInit } from "@angular/core";
import { ModalController } from "@ionic/angular";
import { AuthService } from "src/app/core/auth.service";

@Component({
  selector: "app-qrmodal",
  templateUrl: "./qrmodal.component.html",
  styleUrls: ["./qrmodal.component.scss"],
})
export class QrmodalComponent implements OnInit {
  user: any;
  constructor(
    private modalController: ModalController,
    private authService: AuthService
  ) {}

  deliver() {}

  async ngOnInit() {
    this.user = await this.authService.getUser();
    // console.log(this.user);
  }

  modalClose() {
    this.modalController.dismiss();
  }
}

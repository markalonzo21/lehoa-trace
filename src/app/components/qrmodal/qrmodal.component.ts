import { Component, OnInit } from "@angular/core";
import { ModalController } from "@ionic/angular";

@Component({
  selector: "app-qrmodal",
  templateUrl: "./qrmodal.component.html",
  styleUrls: ["./qrmodal.component.scss"],
})
export class QrmodalComponent implements OnInit {
  constructor(private modalController: ModalController) {}

  ngOnInit() {}

  modalClose() {
    this.modalController.dismiss();
  }
}

import { Component, OnInit } from "@angular/core";
import { ModalController } from "@ionic/angular";

@Component({
  selector: "app-vehiclemodal",
  templateUrl: "./vehiclemodal.component.html",
  styleUrls: ["./vehiclemodal.component.scss"],
})
export class VehiclemodalComponent implements OnInit {
  constructor(private modalController: ModalController) {}

  ngOnInit() {}

  modalClose() {
    this.modalController.dismiss();
  }
}

import { Component, OnInit } from "@angular/core";
import { MenuController } from "@ionic/angular";

@Component({
  selector: "app-profile",
  templateUrl: "./profile.page.html",
  styleUrls: ["./profile.page.scss"],
})
export class ProfilePage implements OnInit {
  constructor(private menuController: MenuController) {}

  ngOnInit() {}

  ionViewWillEnter() {
    this.menuController.toggle();
  }
}

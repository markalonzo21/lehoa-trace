import { Component, HostListener, OnInit } from "@angular/core";
import { MenuController, ModalController, Platform } from "@ionic/angular";
import { Observable } from "rxjs";
import { CameramodalComponent } from "../components/cameramodal/cameramodal.component";
import { AuthService } from "../core/auth.service";
import { Trace, TraceService } from "../core/trace.service";
export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}
@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.page.html",
  styleUrls: ["./dashboard.page.scss"],
})
export class DashboardPage implements OnInit {
  isMobile: boolean;

  scanResult = null;
  traceList: Observable<any>;
  barCode: string = "";

  userType: string;

  constructor(
    private menuController: MenuController,
    private platform: Platform,
    private modalController: ModalController,
    private traceService: TraceService,
    private authService: AuthService
  ) {
    // check if it is ios device
    const isInStandaloneMode = () =>
      "standalone" in window.navigator && window.navigator["standalond"];
    if (platform.is("ios") && isInStandaloneMode) {
      console.log("ios pwa mode");
    }
    if (this.platform.is("android")) {
      this.isMobile = this.platform.is("android");
    } else if (this.platform.is("ios")) {
      this.isMobile = this.platform.is("ios");
    } else {
      this.isMobile = false;
    }
  }

  //barcode scanner
  @HostListener("window: keypress", ["$event"])
  handleEvent(ev: KeyboardEvent) {
    if (ev.key !== "Enter") {
      this.barCode += ev.key;
    }
    if (ev.key == "Enter") {
      // check if pattern exist
      let scanCode = this.barCode.match(/\bLEHOA\=\?\>\</g);
      if (scanCode !== null) {
        // extract data
        this.scanResult = this.barCode.replace(/\bLEHOA\=\?\>\</g, "");
        this.saveScan();
      }
      this.barCode = "";
    }
  }

  async startScan() {
    const modal = await this.modalController.create({
      component: CameramodalComponent,
    });
    await modal.present();
    this.scanResult = (await modal.onWillDismiss()).data;
    this.saveScan();
  }

  async saveScan() {
    let user = await this.authService.getUser();
    if (user) {
      let parseResult = JSON.parse(this.scanResult);

      parseResult.date = new Date().toISOString();
      parseResult.merchant = user._id;
      parseResult.age = this.traceService.calculateAge(parseResult.age);
      this.traceService.addToList(parseResult);
    }
  }

  async ngOnInit() {
    this.menuController.enable(true);
    if (this.isMobile) {
      this.traceList = this.traceService.getTraceList();
    } else {
      this.traceList = this.traceService.getObservableTraceList();
    }
    this.userType = await this.authService.getloginType();
  }

  ionViewWillEnter() {
    this.traceService.loadData();
  }

  ionViewWillLeave() {}

  segmentChanged(ev) {
    this.traceService.toggleValue.next(ev.target.value);
  }
}

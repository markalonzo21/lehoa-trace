import { Component, HostListener, OnInit } from "@angular/core";
import { MenuController, ModalController, Platform } from "@ionic/angular";
import { from, Observable } from "rxjs";
import { map, switchMap, tap } from "rxjs/operators";
import { CameramodalComponent } from "../components/cameramodal/cameramodal.component";
import { AuthService } from "../core/auth.service";
import { TraceService } from "../core/trace.service";
import { Plugins } from "@capacitor/core";
import { OfflineManagerService } from "../core/offline-manager.service";

const { Storage } = Plugins;
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
    private authService: AuthService,
    private offlineManager: OfflineManagerService
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
    // const modal = await this.modalController.create({
    //   component: CameramodalComponent,
    // });
    // await modal.present();
    // let scanData = (await modal.onWillDismiss()).data;
    // this.scanResult = scanData ? scanData : null;
    // console.log("scanResult", this.scanResult);
    this.scanResult = JSON.stringify({
      user: "602dd6fa6f91870fa8119877",
      name: "jorge marcus kaysen",
      age: 28,
      gender: "male",
    });
    this.saveScan();
  }

  async saveScan() {
    let user = await this.authService.getUser();
    if (user && this.scanResult !== null) {
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

    this.offlineManager.syncLocalData();
  }

  ionViewWillEnter() {
    this.traceService.loadData();
  }

  ionViewWillLeave() {}

  segmentChanged(ev) {
    this.traceService.toggleValue.next(ev.target.value);
  }
}

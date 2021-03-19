import { Injectable } from "@angular/core";
import { Plugins } from "@capacitor/core";
import { Platform, ToastController } from "@ionic/angular";
import { BehaviorSubject, Observable } from "rxjs";

const { Network, Toast } = Plugins;

@Injectable({
  providedIn: "root",
})
export class NetworkService {
  networkStatus: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  constructor(
    private toastController: ToastController,
    private platform: Platform
  ) {
    this.platform.ready().then(() => {
      this.getCurrentNetworkStatus().then((status) => {
        this.networkStatus.next(status.connected);
      });
      Network.addListener("networkStatusChange", (status) => {
        console.log(status.connected);
        this.networkStatus.next(status.connected);
        this.updateNetworkStatus(status.connected);
      });
    });
  }

  private async updateNetworkStatus(status: boolean) {
    let networkStatus = status ? "Online :)" : "Offline :(";
    this.toastController
      .create({
        message: `You are now ${networkStatus}`,
        duration: 3000,
        position: "top",
        color: status ? "success" : "danger",
        buttons: [
          {
            icon: "wifi",
            side: "start",
          },
        ],
      })
      .then((toast) => toast.present());
  }

  getCurrentNetworkStatus() {
    return Network.getStatus();
  }

  onNetworkChange(): Observable<boolean> {
    return this.networkStatus.asObservable();
  }
}

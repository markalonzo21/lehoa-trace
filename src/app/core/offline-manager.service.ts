import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Plugins } from "@capacitor/core";
import { EMPTY, from, throwError } from "rxjs";
import {
  catchError,
  filter,
  finalize,
  map,
  mergeMap,
  switchMap,
  take,
} from "rxjs/operators";
import { environment } from "src/environments/environment";
import { NetworkService } from "./network.service";
import { UiService } from "./ui.service";

const { Storage, Network } = Plugins;
const STORAGE_REQ_KEY = "storedreq";
const api = environment.api;

@Injectable({
  providedIn: "root",
})
export class OfflineManagerService {
  constructor(
    private http: HttpClient,
    private networkService: NetworkService,
    private uiService: UiService
  ) {}

  syncToServer(inputs: any) {
    return this.http.post(`${api}traces/sync`, inputs).pipe(
      take(1),
      catchError((err) => {
        this.uiService.presentToast(
          "Opps something went wrong, Please reload the app",
          "danger"
        );
        return throwError(err);
      })
    );
  }

  syncLocalData() {
    this.networkService
      .onNetworkChange()
      .pipe(
        filter((status) => status !== false),
        switchMap(() => {
          return from(Storage.get({ key: STORAGE_REQ_KEY })).pipe(
            mergeMap((storedOperation) => {
              console.log(storedOperation);
              let storedObj = JSON.parse(storedOperation.value);
              if (storedObj && storedObj.length !== 0) {
                return this.syncToServer(storedObj).pipe(
                  finalize(() => {
                    this.uiService.presentToast(
                      "Local data succesfully synced to server!",
                      "success"
                    );
                    Storage.remove({ key: STORAGE_REQ_KEY });
                  })
                );
              }
              return EMPTY;
            })
          );
        })
      )
      .subscribe();
  }

  // offline mode save
  saveToLocal(inputs: any) {
    this.uiService.presentToast(
      `Your data is stored locally because you seem to be offline.`
    );
    return Storage.get({ key: STORAGE_REQ_KEY }).then((storedReq) => {
      let storedObj = JSON.parse(storedReq.value);
      if (storedObj) {
        storedObj.push(inputs);
      } else {
        storedObj = [inputs];
      }
      return Storage.set({
        key: STORAGE_REQ_KEY,
        value: JSON.stringify(storedObj),
      });
    });
  }

  localStorage() {
    return Storage.get({ key: STORAGE_REQ_KEY });
  }
}

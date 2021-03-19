import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, EMPTY, from, iif, Subscription } from "rxjs";
import {
  catchError,
  filter,
  flatMap,
  map,
  mergeMap,
  switchMap,
  take,
} from "rxjs/operators";
import { environment } from "src/environments/environment";
import { Plugins } from "@capacitor/core";
import { UiService } from "./ui.service";
import { NetworkService } from "./network.service";
import { OfflineManagerService } from "./offline-manager.service";

const { Storage } = Plugins;
export interface Trace {
  date: string;
  user: string;
  age: number;
  gender: string;
  merchant: string;
}

const api = environment.api;

@Injectable({
  providedIn: "root",
})
export class TraceService {
  private trace_list: Trace[] = [];
  private observableTraceList: BehaviorSubject<Trace[]>;
  private subscriptions: Subscription = new Subscription();

  toggleValue: BehaviorSubject<string> = new BehaviorSubject("today");

  constructor(
    private http: HttpClient,
    private uiService: UiService,
    private networkService: NetworkService,
    private offlineManager: OfflineManagerService
  ) {
    // initialized subjects
    this.observableTraceList = <BehaviorSubject<Trace[]>>(
      new BehaviorSubject([])
    );
    this.subscriptions.add(this.observableTraceList);
    this.subscriptions.add(this.toggleValue);
  }

  loadData() {
    // load data from server unmanged
    let serverData = from(Storage.get({ key: "type" }))
      .pipe(
        mergeMap((ret) =>
          from(Storage.get({ key: "user" })).pipe(
            map((user) => {
              return { logType: ret.value, user: JSON.parse(user.value) };
            })
          )
        ),
        flatMap((data) =>
          iif(
            () => data.logType === "merchant",
            this.getAllTraces(data.user._id),
            this.getAllUserTraces(data.user._id)
          )
        )
      )
      .subscribe((list) => {
        this.trace_list = list;
        console.log(this.trace_list);
        this.observableTraceList.next(Object.assign([], this.trace_list));
      });
    this.subscriptions.add(serverData);
  }

  addToList(scanResult: any) {
    // this.trace_list.push(scanResult);
    this.trace_list.unshift(scanResult);
    this.networkService.getCurrentNetworkStatus().then((status) => {
      if (status.connected) {
        this.save(scanResult);
      } else {
        this.offlineManager.saveToLocal(scanResult);
      }
    });
    this.observableTraceList.next(Object.assign([], this.trace_list));
  }

  getObservableTraceList() {
    return this.observableTraceList.asObservable();
  }

  getTraceList() {
    return this.getObservableTraceList().pipe(
      switchMap((_) => this.toggleValue.asObservable()),
      map((val) => {
        if (val === "today") {
          return this.getAllTracesToday();
        } else {
          return this.sortByDate();
        }
      })
    );
  }

  // filter by date
  private sortByDate(): any {
    let sortedList = this.trace_list.reduce((list, item) => {
      const date = item.date.split("T")[0];
      if (!list[date]) {
        //
        list[date] = [];
      }
      list[date].push(item);
      return list;
    }, {});

    sortedList = Object.keys(sortedList).map((date) => {
      return { date, traces: sortedList[date] };
    });
    return sortedList;
  }

  // filter today only
  private getAllTracesToday() {
    // today
    return this.sortByDate().filter((item) => {
      return (
        this.formatDate(new Date(item.date)) == this.formatDate(new Date())
      );
    });
  }

  // set date format
  private formatDate(date: Date) {
    let dd = String(date.getDate()).padStart(2, "0");
    let mm = String(date.getMonth() + 1).padStart(2, "0");
    let yyyy = date.getFullYear();
    return `${mm}/${dd}/${yyyy}`;
  }

  // compute age based from user bdate
  calculateAge(bdate: string) {
    const today = new Date();
    const bd = new Date(bdate);
    let age = today.getFullYear() - bd.getFullYear();
    let m = today.getMonth() - bd.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < bd.getDate())) {
      age--;
    }
    return age;
  }

  // clear subcriptions
  unsubscribe() {
    this.subscriptions.unsubscribe();
  }

  // save to server
  private save(inputs: any) {
    return this.http
      .post(`${api}traces/save`, inputs)
      .pipe(
        take(1),
        map((data) => console.log(data)),
        catchError(this.handleError)
      )
      .subscribe();
  }

  // data from server : merchant
  private getAllTraces(_id: string) {
    return this.http.post(`${api}traces/merchant`, { merchant: _id }).pipe(
      take(1),
      filter((data: Trace[]) => data.length > 0),
      catchError((err) => this.handleError(err))
    );
  }

  // data from server : user
  private getAllUserTraces(_id: string) {
    return this.http.post(`${api}traces/user`, { user: _id }).pipe(
      take(1),
      filter((data: Trace[]) => data.length > 0),
      catchError((err) => this.handleError(err))
    );
  }

  private handleError(err) {
    const msg = `Error: ${err.error}`;
    this.uiService.presentToast(
      "Opps something went wrong, Please reload the app",
      "danger"
    );
    return EMPTY;
  }
}

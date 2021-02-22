import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Subscription, throwError } from "rxjs";
import { catchError, filter, map, switchMap, take } from "rxjs/operators";
import { environment } from "src/environments/environment";

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

  constructor(private http: HttpClient) {
    // initialized subjects
    this.observableTraceList = <BehaviorSubject<Trace[]>>(
      new BehaviorSubject([])
    );
    this.subscriptions.add(this.observableTraceList);
    this.subscriptions.add(this.toggleValue);
    // load data from server unmanged
    this.getAllTraces().subscribe((list) => {
      this.trace_list = list;
      this.observableTraceList.next(Object.assign([], this.trace_list));
    });
  }

  addToList(scanResult: any) {
    this.trace_list.push(scanResult);
    this.save(scanResult);
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

  // data from server
  private getAllTraces() {
    return this.http.get(`${api}traces`).pipe(
      take(1),
      filter((data: Trace[]) => data.length > 0),
      catchError(this.handleError)
    );
  }

  private handleError(err) {
    const msg = `Error: ${err.error}`;
    return throwError(msg);
  }
}

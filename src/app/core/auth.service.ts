import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Plugins } from "@capacitor/core";
import { BehaviorSubject, throwError } from "rxjs";
import { catchError, map } from "rxjs/operators";
import { environment } from "src/environments/environment";

const { Storage } = Plugins;

@Injectable({
  providedIn: "root",
})
export class AuthService {
  private api = environment.api;
  private userState = new BehaviorSubject<boolean>(null);

  constructor(private http: HttpClient) {
    this.checkUserState();
  }

  userstate() {
    return this.userState.asObservable();
  }

  private async checkUserState() {
    const user = await this.getUser();
    if (user) {
      this.userState.next(true);
    } else {
      this.userState.next(false);
    }
  }

  login(username: string, password: string, merchant: boolean) {
    const route = merchant ? "merchants" : "users";
    this.setloginType(merchant ? "merchant" : "user");
    return this.http
      .post(`${this.api}${route}/login`, { username, password })
      .pipe(
        map((data) => {
          this.setUser(data);
        }),
        catchError(this.handleError)
      );
  }

  async logout() {
    await Storage.remove({ key: "user" }).then((_) => {
      console.log("storage cleared");
      this.userState.next(false);
    });
  }

  isLogedIn() {
    return this.userState.getValue();
  }

  async setloginType(type: string) {
    await Storage.set({ key: "type", value: type });
  }

  async getloginType() {
    const { value } = await Storage.get({ key: "type" });
    return value;
  }

  async setUser(data: Object) {
    await Storage.set({ key: "user", value: JSON.stringify(data) });
    this.userState.next(true);
  }

  async getUser() {
    const ret = await Storage.get({ key: "user" });
    return JSON.parse(ret.value);
  }

  handleError(err) {
    const msg = `Error: ${err.error}`;
    return throwError(msg);
  }
}

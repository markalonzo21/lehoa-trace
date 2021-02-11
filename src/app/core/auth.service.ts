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
  userState = new BehaviorSubject<boolean>(null);

  constructor(private http: HttpClient) {}

  login(username: string, password: string) {
    return this.http
      .post(`${this.api}users/login`, { username, password })
      .pipe(
        map((data) => {
          this.setUser(data);
        }),
        catchError(this.handleError)
      );
  }

  async logout() {
    await Storage.remove({ key: "user" });
    this.userState.next(false);
  }

  isLogedIn() {
    return this.userState.getValue();
  }

  async setUser(data: Object) {
    await Storage.set({ key: "user", value: JSON.stringify(data) });
    this.userState.next(true);
  }

  async getUser() {
    return await Storage.get({ key: "user" });
  }

  handleError(err) {
    const msg = `Error: ${err.error}`;
    return throwError(msg);
  }
}

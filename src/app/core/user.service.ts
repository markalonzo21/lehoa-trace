import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { throwError } from "rxjs";
import { catchError, map, take } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class UserService {
  private api = environment.api;

  constructor(private http: HttpClient) {}

  register(form: any) {
    return this.http.post(`${this.api}users/register`, form).pipe(
      take(1),
      map((data) => console.log(data)),
      catchError(this.handleError)
    );
  }

  validateEmail(email) {
    return this.http.post(`${this.api}users/validateEmail`, email).pipe(
      map((data) => console.log(data)),
      catchError(this.handleError)
    );
  }

  private handleError(err) {
    const msg = `Error: ${err.error}`;
    return throwError(msg);
  }
}

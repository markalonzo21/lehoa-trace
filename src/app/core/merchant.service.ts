import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { throwError } from "rxjs";
import { catchError, map, take } from "rxjs/operators";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class MerchantService {
  private api = environment.api;

  constructor(private http: HttpClient) {}

  register(form: any) {
    return this.http
      .post(`${this.api}merchants/register`, form)
      .pipe(take(1), catchError(this.handleError));
  }

  validateEmail(email) {
    return this.http.post(`${this.api}merchants/validateEmail`, email).pipe(
      map((data) => console.log(data)),
      catchError(this.handleError)
    );
  }

  updateAddress(input: any) {
    return this.http
      .post(`${this.api}merchants/updateAddress`, input)
      .pipe(take(1), catchError(this.handleError));
  }

  private handleError(err) {
    const msg = `Error: ${err.error}`;
    return throwError(msg);
  }
}

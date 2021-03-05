import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { throwError } from "rxjs";
import { catchError, map, take } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class UserService {
  private api = environment.api + "users";

  constructor(private http: HttpClient) {}

  register(form: any) {
    return this.http
      .post(`${this.api}/register`, form)
      .pipe(take(1), catchError(this.handleError));
  }

  updateUser(id: string, form: any) {
    return this.http
      .patch(`${this.api}/update/${id}`, form)
      .pipe(take(1), catchError(this.handleError));
  }

  validateEmail(email) {
    return this.http.post(`${this.api}/validateEmail`, email).pipe(
      map((data) => console.log(data)),
      catchError(this.handleError)
    );
  }

  updateAddress(input: any) {
    return this.http
      .post(`${this.api}/updateAddress`, input)
      .pipe(take(1), catchError(this.handleError));
  }

  private handleError(err) {
    const msg = `Error: ${err.error}`;
    return throwError(msg);
  }
}

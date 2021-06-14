import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../environments/environment";

const api = environment.api;

@Injectable({
  providedIn: "root",
})
export class VaccineService {
  constructor(private http: HttpClient) {}

  register(input: any) {
    return this.http.post(`${api}vaccine/register`, input, {
      observe: "response",
    });
  }
}

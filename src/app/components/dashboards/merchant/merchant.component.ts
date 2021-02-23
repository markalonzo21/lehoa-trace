import { Component, Input, OnInit } from "@angular/core";
import { Observable } from "rxjs";
// import {  } from '../dashboards.scss'

@Component({
  selector: "merchant-dashboard",
  templateUrl: "./merchant.component.html",
  styleUrls: ["../dashboards.scss"],
})
export class MerchantComponent implements OnInit {
  @Input() traceList: Observable<any>;
  @Input() isMobile: boolean;

  displayedColumns: string[] = ["date", "age", "gender"];

  constructor() {}

  ngOnInit() {}
}

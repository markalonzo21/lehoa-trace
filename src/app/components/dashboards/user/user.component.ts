import { Component, Input, OnInit } from "@angular/core";
import { Observable } from "rxjs";

@Component({
  selector: "user-dashboard",
  templateUrl: "./user.component.html",
  styleUrls: ["../dashboards.scss"],
})
export class UserComponent implements OnInit {
  @Input() traceList: Observable<any>;
  @Input() isMobile: boolean;

  displayedColumns: string[] = ["date", "time", "company", "age", "gender"];

  constructor() {}

  ngOnInit() {}
}

import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";
import { AppMaterialModule } from "../app-material/app-material.module";
import { DashboardsModule } from "../components/dashboards/dashboards.module";

import { DashboardPageRoutingModule } from "./dashboard-routing.module";

import { DashboardPage } from "./dashboard.page";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DashboardPageRoutingModule,
    AppMaterialModule,
    DashboardsModule,
  ],
  declarations: [DashboardPage],
})
export class DashboardPageModule {}

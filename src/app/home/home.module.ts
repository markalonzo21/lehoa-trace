import { NgModule } from "@angular/core";
// import { CommonModule } from "@angular/common";
// import { IonicModule } from "@ionic/angular";
import { HomePage } from "./home.page";
// import { ReactiveFormsModule, FormsModule } from "@angular/forms";

import { HomePageRoutingModule } from "./home-routing.module";
import { ComponentsModule } from "../components/components.module";

@NgModule({
  imports: [
    // CommonModule,
    // IonicModule,
    HomePageRoutingModule,
    ComponentsModule,
    // ReactiveFormsModule,
    // FormsModule,
  ],
  declarations: [HomePage],
})
export class HomePageModule {}

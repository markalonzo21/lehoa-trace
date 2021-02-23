import { NgModule } from "@angular/core";
import { HomePage } from "./home.page";

import { HomePageRoutingModule } from "./home-routing.module";
import { ComponentsModule } from "../components/components.module";

@NgModule({
  imports: [HomePageRoutingModule, ComponentsModule],
  declarations: [HomePage],
})
export class HomePageModule {}

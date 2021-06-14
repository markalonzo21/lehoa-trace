import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { VaccineRegistrationPageRoutingModule } from "./vaccine-registration-routing.module";

import { VaccineRegistrationPage } from "./vaccine-registration.page";

import { UiSwitchModule } from "ngx-ui-switch";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    VaccineRegistrationPageRoutingModule,
    UiSwitchModule,
  ],
  declarations: [VaccineRegistrationPage],
})
export class VaccineRegistrationPageModule {}

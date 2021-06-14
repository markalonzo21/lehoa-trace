import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VaccineRegistrationPage } from './vaccine-registration.page';

const routes: Routes = [
  {
    path: '',
    component: VaccineRegistrationPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VaccineRegistrationPageRoutingModule {}

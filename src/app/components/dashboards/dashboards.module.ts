import { NgModule } from "@angular/core";
import { UserComponent } from "./user/user.component";
import { MerchantComponent } from "./merchant/merchant.component";

import { SharedModule } from "../../shared/shared.module";
import { AppMaterialModule } from "../../app-material/app-material.module";

@NgModule({
  declarations: [UserComponent, MerchantComponent],
  imports: [SharedModule, AppMaterialModule],
  exports: [UserComponent, MerchantComponent],
})
export class DashboardsModule {}

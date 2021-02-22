import { NgModule } from "@angular/core";

import { LoginComponent } from "./login/login.component";
import { CameramodalComponent } from "./cameramodal/cameramodal.component";
import { RegisterComponent } from "./register/register.component";
import { MerchantComponent } from "./merchant/merchant.component";
import { NotificationComponent } from "./notification/notification.component";
import { SuccessComponent } from "./notification/success/success.component";

import { SharedModule } from "../shared/shared.module";
@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    CameramodalComponent,
    MerchantComponent,
    NotificationComponent,
    SuccessComponent,
  ],
  imports: [SharedModule],
  exports: [
    LoginComponent,
    CameramodalComponent,
    RegisterComponent,
    MerchantComponent,
    NotificationComponent,
    SuccessComponent,
    SharedModule,
  ],
})
export class ComponentsModule {}

import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { IonicModule } from "@ionic/angular";
import { LoginComponent } from "./login/login.component";
import { RegisterComponent } from "./register/register.component";
import { NotificationComponent } from "./notification/notification.component";
import { SuccessComponent } from "./notification/success/success.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatIconModule } from "@angular/material/icon";

@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    NotificationComponent,
    SuccessComponent,
  ],
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
  ],
  exports: [LoginComponent, RegisterComponent],
})
export class ComponentsModule {}

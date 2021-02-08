import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { IonicModule } from "@ionic/angular";
import { LoginComponent } from "./login/login.component";
import { RegisterComponent } from "./register/register.component";

@NgModule({
  declarations: [LoginComponent, RegisterComponent],
  imports: [IonicModule, CommonModule],
  exports: [LoginComponent, RegisterComponent],
})
export class ComponentsModule {}

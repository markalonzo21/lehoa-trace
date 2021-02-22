import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { IonicModule } from "@ionic/angular";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { SimpleMaskModule } from "ngx-ion-simple-mask";
import { MatIconModule } from "@angular/material/icon";
import { MatRadioModule } from "@angular/material/radio";

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    ReactiveFormsModule,
    FormsModule,
    SimpleMaskModule,
    MatIconModule,
    MatRadioModule,
  ],
  declarations: [],
  exports: [
    CommonModule,
    IonicModule,
    ReactiveFormsModule,
    FormsModule,
    SimpleMaskModule,
    MatIconModule,
    MatRadioModule,
  ],
})
export class SharedModule {}

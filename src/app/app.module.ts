import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { RouteReuseStrategy } from "@angular/router";

import { IonicModule, IonicRouteStrategy } from "@ionic/angular";
import { SplashScreen } from "@ionic-native/splash-screen/ngx";
import { StatusBar } from "@ionic-native/status-bar/ngx";
import { HttpClientModule } from "@angular/common/http";

import { AppComponent } from "./app.component";
import { AppRoutingModule } from "./app-routing.module";
import { ServiceWorkerModule } from "@angular/service-worker";
import { environment } from "../environments/environment";
import { navAnimation } from "./animations/nav-animation";
import { enterAnimation, leaveAnimation } from "./animations/loading-animation";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { AppMaterialModule } from "./app-material/app-material.module";
import { QrmodalComponent } from "./components/qrmodal/qrmodal.component";
import { VehiclemodalComponent } from "./components/vehiclemodal/vehiclemodal.component";
import { AuthService } from "./core/auth.service";

@NgModule({
  declarations: [AppComponent, QrmodalComponent, VehiclemodalComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot({
      navAnimation: null,
      loadingEnter: enterAnimation,
      loadingLeave: leaveAnimation,
    }),
    AppRoutingModule,
    ServiceWorkerModule.register("ngsw-worker.js", {
      enabled: environment.production,
    }),
    AppMaterialModule,
    BrowserAnimationsModule,
    HttpClientModule,
  ],
  providers: [
    AuthService,
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}

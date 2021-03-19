import {
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { LoadingController, ToastController } from "@ionic/angular";
import { Observable, throwError } from "rxjs";
import { catchError, finalize } from "rxjs/operators";
import { environment } from "src/environments/environment";

@Injectable()
export class HttpLoadingInterceptor implements HttpInterceptor {
  constructor(
    private loadingController: LoadingController,
    private toastController: ToastController
  ) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<any> {
    if (environment.production) {
      this.loadingController.getTop().then((hasLoading) => {
        if (!hasLoading)
          this.loadingController.create().then((loading) => loading.present());
      });
      return next.handle(request).pipe(
        finalize(() => {
          this.loadingController.getTop().then((isPresent) => {
            if (isPresent) this.loadingController.dismiss();
          });
        })
      );
    }
    return next.handle(request);
  }

  async presentToast(message: string, color: string) {
    const toast = await this.toastController.create({
      message,
      position: "top",
      color,
    });
    toast.present();
  }
}

import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { LoadingController, ToastController } from "@ionic/angular";
import { EMPTY, from, of } from "rxjs";
import { Observable, throwError } from "rxjs";
import { catchError, finalize, map, mergeMap, switchMap } from "rxjs/operators";

@Injectable()
export class HttpLoadingInterceptor implements HttpInterceptor {
  constructor(
    private loadingController: LoadingController,
    private toastController: ToastController
  ) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<any> {
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

  async presentToast(message: string, color: string) {
    const toast = await this.toastController.create({
      message,
      position: "top",
      color,
    });
    toast.present();
  }

  handleError(err) {
    const msg = `Error: ${err.error}`;
    // this.presentToast(msg, 'danger');
    return throwError(msg);
  }
}

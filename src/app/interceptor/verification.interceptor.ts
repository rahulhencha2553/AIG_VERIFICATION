import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HTTP_INTERCEPTORS,
} from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { AppUtils } from '../utils/app-utils';

@Injectable()
export class VerificationInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    let token = this.authService.getToken();

    if (token !== null) {
      request = request.clone({
        setHeaders:{Authorization: `Bearer ${token}`}
    });
    }

    return next.handle(request).pipe(catchError((error:any)=>{
      if(error.status==401){ 
        this.authService.logOut();
        AppUtils.openToast('error',error.error.message,'Error')   
      }
      return throwError(error);
    }));
  }
}

export const authInterceptorProvider = [
  {
      provide:HTTP_INTERCEPTORS,
      useClass: VerificationInterceptor,
      multi: true,
  },
];

import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable, throwError } from 'rxjs';
import { filter, tap, catchError } from 'rxjs/operators';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { AuthService } from './services/auth.service';
import { SpinnerService } from '../global-components/services/spinner.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(
    private router: Router,
    private authservice: AuthService,
    private spinnerService: SpinnerService
  ) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    this.spinnerService.showSpinner()
    if (this.authservice.isLoggedIn()) {
      const token = this.authservice.getToken();
      if (token && this.isTokenExpired(token)) {
        this.authservice.logout();
        this.router.navigateByUrl('login');
        return next.handle(request);
      } else {
        const cloned = request.clone({
          headers: request.headers.set('Authorization', `Bearer ${token}`),
        });
        return next.handle(cloned)
      }
    }
    return next
      .handle(request)
      .pipe(
        catchError((err: HttpErrorResponse) => {
          this.spinnerService.hideSpinner();
          return throwError(() => err)
        })
      )
      .pipe(
        filter((event: any) => event instanceof HttpResponse),
        tap(() => this.spinnerService.hideSpinner())
      )
  }

  isTokenExpired(token: string): boolean {
    return new JwtHelperService().isTokenExpired(token);
  }
}

import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';

import { AuthService } from './services/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(
    private authservice: AuthService,
    private router: Router
  ) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
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
    return next.handle(request)
  }

  isTokenExpired(token: string): boolean {
    return new JwtHelperService().isTokenExpired(token);
  }
}

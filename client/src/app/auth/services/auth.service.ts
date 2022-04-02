import config from './../../config/app.config';

import { tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  constructor(private http: HttpClient) { }

  login(email: string, password: string) {
    return this.http
      .post<any>(`${config.APP.BASE_URL}/api/auth/login`, {
        email,
        password
      })
      .pipe(tap((res) => this.setToken(res)))
  }

  logout() {
    localStorage.removeItem('user')
    localStorage.removeItem('token')
  }

  isLoggedIn() {
    const token = localStorage.getItem('token')
    if (token) return true
    else return false
  }

  private setToken(res: any) {
    localStorage.setItem('user', res.user)
    localStorage.setItem('token', res.token)
  }
}

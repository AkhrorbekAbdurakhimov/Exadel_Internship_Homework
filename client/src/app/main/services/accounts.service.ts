import config from './../../config/app.config';

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class AccountsService {

  constructor(private http: HttpClient) { }

  getAccounts() {
    return this.http
      .get<any>(`${config.APP.BASE_URL}/api/accounts`)
  }
}

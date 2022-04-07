import { environment } from 'src/environments/environment';

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class AccountsService {

  constructor(private http: HttpClient) { }

  getAccounts() {
    return this.http
      .get<any>(`${environment.apiUrl}/api/accounts`)
  }
}

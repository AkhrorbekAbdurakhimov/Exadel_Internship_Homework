import { environment } from 'src/environments/environment';

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class TransactionsService {

  constructor(private http: HttpClient) { }

  getTransactions() {
    return this.http
      .get<any>(`${environment.apiUrl}/api/transactions`)
  }
}

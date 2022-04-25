import { environment } from 'src/environments/environment';

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class TransactionsService {

  constructor(private http: HttpClient) { }

  getTransactions(accountId: number, type: any = null, order: any = null) {
    return this.http
      .get<any>(`
        ${environment.apiUrl}/api/transactions/${accountId}${type && order ? `?type=${type}&order=${order}` :
          order ? `?order=${order}` : type ? `?type=${type}` : ''
        }`)
  }

  getTransaction(transactionId: number) {
    return this.http
      .get<any>(`${environment.apiUrl}/api/transactions/transaction/${transactionId}`)
  }

  addTransaction(accountId: number, type: string, categoryIds: number[], title: string, amount: number, date: string, description: any = null) {
    return this.http
      .post<any>(`${environment.apiUrl}/api/transactions`, {
        accountId,
        type,
        categoryIds,
        title,
        amount,
        date,
        description
      })
  }

  deleteTransaction(transactionId: number) {
    console.log(transactionId);
    return this.http
      .delete<any>(`${environment.apiUrl}/api/transactions/${transactionId}`)
  }
}

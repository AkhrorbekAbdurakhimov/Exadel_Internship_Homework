import { environment } from 'src/environments/environment';

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class SubscriptionsService {

  constructor(
    private http: HttpClient
  ) { }

  getSubscriptions(accountId: number) {
    return this.http
      .get<any>(`${environment.apiUrl}/api/subscriptions/${accountId}`)
  }

  getSubscription(subscriptionId: number) {
    return this.http
      .get<any>(`${environment.apiUrl}/api/subscriptions/subscription/${subscriptionId}`)
  }

  addSubscription(accountId: number, title: string, categories: string[], amount: number, initialDate: string, lastDate: any = null, description: any = null) {
    console.log(accountId, title, categories, amount, initialDate, lastDate, description);

    return this.http
      .post<any>(`${environment.apiUrl}/api/subscriptions`, {
        accountId,
        title,
        categories,
        amount,
        initialDate,
        lastDate,
        description
      })
  }
}

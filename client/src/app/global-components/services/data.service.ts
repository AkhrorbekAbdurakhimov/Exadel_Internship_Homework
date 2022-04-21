import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';

import { Account } from '../models/account.model';

@Injectable({
  providedIn: 'root'
})

export class DataService {

  private accountIdSource = new BehaviorSubject<number>(0);
  private accountsSource = new BehaviorSubject<Account[]>([]);
  private accountModalStatusSource = new BehaviorSubject<boolean>(false);

  accounts = this.accountsSource.asObservable();
  currentAccountId = this.accountIdSource.asObservable();
  currentaccountModalStatus = this.accountModalStatusSource.asObservable();

  constructor() { }

  sendAccounts(accounts: Account[]) {
    this.accountsSource.next(accounts);
  }

  sendAccountId(accountId: number) {
    this.accountIdSource.next(accountId);
  }

  sendAccountModalStatus(status: boolean) {
    this.accountModalStatusSource.next(status);
  }
}

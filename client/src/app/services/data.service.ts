import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';

import { Account } from '../models/account.model';

@Injectable({
  providedIn: 'root'
})

export class DataService {

  // toaster - message

  private isWarningSource = new BehaviorSubject<boolean>(false);
  private toasterMessageSource = new BehaviorSubject<string>('');
  private toasterMessageStatusSource = new BehaviorSubject<boolean>(false);

  // accounts

  private accountIdSource = new BehaviorSubject<number>(0)
  private accountsSource = new BehaviorSubject<Account[]>([])
  private addAccountModalStatusSource = new BehaviorSubject<boolean>(false);

  // toaster-message

  isWarning = this.isWarningSource.asObservable();
  toasterMessage = this.toasterMessageSource.asObservable();
  toasterMessageStatus = this.toasterMessageStatusSource.asObservable();

  // accounts

  accounts = this.accountsSource.asObservable();
  currentAccountId = this.accountIdSource.asObservable();
  currentAccountModalStatus = this.addAccountModalStatusSource.asObservable();

  constructor() { }

  // accounts

  sendAccounts(accounts: Account[]) {
    this.accountsSource.next(accounts);
  }

  sendAccountId(accountId: number) {
    this.accountIdSource.next(accountId);
  }

  sendAccountModalStatus(status: boolean) {
    this.addAccountModalStatusSource.next(status);
  }

  // toaster - message

  changeToasterMessageStatus(status: boolean) {
    this.toasterMessageStatusSource.next(status);
  }

  changeToasterMessage(message: string) {
    this.toasterMessageSource.next(message)
  }

  changeIsWarning(status: boolean) {
    this.isWarningSource.next(status)
  }
}

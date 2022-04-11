import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

import { Account } from '../accounts-sidebar/account.model';

@Injectable({
  providedIn: 'root'
})

export class TransferService {
  private subject = new Subject<any>()

  sendAccountId(accountId: number) {
    this.subject.next(accountId);
  }

  getAccountId(): Observable<number> {
    return this.subject.asObservable();
  }

  sendIsOpenAddModel(isOpen: boolean) {
    this.subject.next(isOpen);
  }

  getIsOpenAddModel(): Observable<boolean> {
    return this.subject.asObservable();
  }

  sendAccounts(accounts: Account[]) {
    this.subject.next(accounts)
  }

  getAccounts(): Observable<Account[]> {
    return this.subject.asObservable();
  }

  constructor() { }
}

import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class DataService {

  private accountIdSource = new BehaviorSubject<number>(0);
  private accountModalStatusSource = new BehaviorSubject<boolean>(false);

  currentAccountId = this.accountIdSource.asObservable();
  currentaccountModalStatus = this.accountModalStatusSource.asObservable();

  constructor() { }

  sendAccountId(accountId: number) {
    this.accountIdSource.next(accountId)
  }

  sendAccountModalStatus(status: boolean) {
    this.accountModalStatusSource.next(status)
  }
}

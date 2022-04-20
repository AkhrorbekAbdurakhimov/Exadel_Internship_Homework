import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private toasterMessageStatusSource = new BehaviorSubject<boolean>(false);
  private toasterMessageSource = new BehaviorSubject<string>('');
  private isWarningSource = new BehaviorSubject<boolean>(false);

  toasterMessageStatus = this.toasterMessageStatusSource.asObservable();
  toasterMessage = this.toasterMessageSource.asObservable();
  isWarning = this.isWarningSource.asObservable();

  constructor() { }

  changeToasterMessageStatus(status: boolean) {
    this.toasterMessageStatusSource.next(status)
  }

  changeToasterMessage(message: string) {
    this.toasterMessageSource.next(message)
  }

  changeIsWarning(status: boolean) {
    this.isWarningSource.next(status)
  }

}

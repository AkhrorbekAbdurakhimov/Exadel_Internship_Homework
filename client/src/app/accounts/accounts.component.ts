import { Component, OnInit } from '@angular/core';

import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

import { Account } from '../models/account.model';
import { Currency } from '../models/currency.modal';

import { DataService } from '../services/data.service';
import { AccountsService } from './services/accounts.service';
import { CurrenciesService } from './services/currencies.service';

@UntilDestroy()
@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.scss']
})

export class AccountsComponent implements OnInit {

  account!: Account
  accounts: Account[] = [];
  currencies: Currency[] = [];

  isOpenAddAccountModal: boolean = false;

  isOpenViewAccountModal: boolean = false;

  constructor(
    private dataservice: DataService,
    private accountsService: AccountsService,
    private currenciesService: CurrenciesService
  ) { }

  ngOnInit(): void {
    this.getAccounts();
    this.getCurrencies();
    this.dataservice
      .currentAccountModalStatus
      .pipe(untilDestroyed(this))
      .subscribe((status) => this.isOpenAddAccountModal = status)
  }

  getAccounts() {
    this.accountsService
      .getAccounts()
      .pipe(untilDestroyed(this))
      .subscribe({
        next: data => {
          this.accounts = data.accounts;
          this.dataservice.sendAccounts(data.accounts);
          this.accounts.forEach(account => {
            console.log(account);
            if (account.isSelected) {
              console.log('send', account.isSelected, account.id);
              this.dataservice.sendAccountId(account.id)
            };
          })
        }
      })
  }

  getAccount(id: number) {
    this.accountsService
      .getAccount(id)
      .pipe(untilDestroyed(this))
      .subscribe({
        next: data => {
          this.account = data.account;
          this.dataservice.sendAccountId(data.account.id);
        }
      })
  }

  getCurrencies() {
    this.currenciesService
      .getCurrencies()
      .pipe(untilDestroyed(this))
      .subscribe({
        next: data => {
          this.currencies = data.currencies;
        }
      })
  }

  openViewAccountModal(accountId: any) {
    this.accounts.map(account => {
      if (account.id === accountId) account.isSelected = true;
      else account.isSelected = false;
    })
    this.isOpenViewAccountModal = true;
    this.getAccount(accountId);
  }

  closeViewAccountModal() {
    this.isOpenViewAccountModal = false;
  }

  openAddAccountModal() {
    this.isOpenAddAccountModal = true;
  }

  closeAddAccountModal() {
    this.isOpenAddAccountModal = false;
  }

}

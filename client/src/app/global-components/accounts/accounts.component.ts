import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

import { Account } from '../models/account.model';
import { Currency } from './../models/currency.modal';

import { DataService } from '../services/data.service';
import { AccountsService } from '../services/accounts.service';
import { CurrenciesService } from '../services/currencies.service';

@UntilDestroy()
@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.scss']
})

export class AccountsComponent implements OnInit{

  account: any = {};
  accountId!: number;
  accounts: Account[] = [];
  currencies: Currency[] = [];
  isOpenAddAccountModal: boolean = false;
  isOpenViewAccountModal: boolean = false;
  isCreateAccountError: boolean = false;
  createAccountErrorMessage!: string;
  toasterMessageStatus: boolean = false;
  toasterMessageText!: string;

  addAccountForm = this.fb.group({
    title: ['', [Validators.required, Validators.maxLength(128)]],
    currency: [0],
    description: ['', [Validators.maxLength(256)]]
  })

  constructor(
    private fb: FormBuilder,
    private dataservice: DataService,
    private accountsService: AccountsService,
    private currenciesService: CurrenciesService,
  ) { }

  ngOnInit() {
    this.getAccounts();
    this.getCurrencies();
    this.dataservice
      .currentaccountModalStatus
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
            if (account.isSelected) this.dataservice.sendAccountId(account.id);
          })
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

  openViewAccountModal(accountId: number) {
    this.accounts.map(account => {
      if (account.id === accountId) account.isSelected = true;
      else account.isSelected = false;
    })
    this.isOpenViewAccountModal = true;
    this.getAccount(accountId);
  }

  closeViewAccountModal() {
    this.isOpenViewAccountModal = false;
    this.account = {}
  }

  openAddAccountModal() {
    this.isOpenAddAccountModal = true;
  }

  closeAddAccountModal() {
    this.isOpenAddAccountModal = false;
  }

  addAccount() {
    if (this.addAccountForm.valid) {
      const { title, currency: currencyId, description } = this.addAccountForm.value;
      this.accountsService
        .createAccount(title, currencyId, description)
        .pipe(untilDestroyed(this))
        .subscribe({
          next: data => {
            this.isOpenAddAccountModal = false;
            this.accounts.push(data.account);
            this.toasterMessageStatus = true;
            setTimeout(() => {
              this.toasterMessageStatus = false;
            }, 5000)
          },
          error: error => {
            this.isCreateAccountError = true;
            this.createAccountErrorMessage = error.error.message;
          }
        })
    }
  }
}

import { DOCUMENT } from '@angular/common';
import { FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit, Inject } from '@angular/core';

import { Account } from './account.model';
import { Currency } from './currency.modal';

import { AccountsService } from '../services/accounts.service';
import { CurrenciesService } from '../services/currencies.service';

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.scss']
})

export class AccountsComponent implements OnInit{

  account: any = {};
  accounts!: Account[];
  currencies!: Currency[];
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
    private accountsService: AccountsService,
    private currenciesService: CurrenciesService,
  ) { }

  ngOnInit() {
    this.getAccounts();
    this.getCurrencies();
  }

  getAccounts() {
    this.accountsService.getAccounts().subscribe({
      next: data => {
        this.accounts = data.accounts;
      }
    })
  }

  getCurrencies() {
    this.currenciesService.getCurrencies().subscribe({
      next: data => {
        this.currencies = data.currencies;
      }
    })
  }

  getAccount(id: number) {
    this.accountsService.getAccount(id).subscribe({
      next: data => {
        this.account = data.account
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
      this.accountsService.createAccount(title, currencyId, description).subscribe({
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

import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

import { Category } from './../../global-components/models/category.model';
import { Transaction } from '../../global-components/models/transaction.model';

import { TransactionsService } from '../services/transactions.service';
import { DataService } from 'src/app/global-components/services/data.service';
import { CategoriesService } from 'src/app/categories-page/services/categories.service';

@UntilDestroy()
@Component({
  selector: 'app-main-aside',
  templateUrl: './main-aside.component.html',
  styleUrls: ['./main-aside.component.scss']
})

export class MainAsideComponent implements OnInit {

  accountId!: number;
  currentTransaction!: Transaction;
  isAddAccountActive: boolean = true;
  isAddTransactionStatus: boolean = true;
  currentTransactionCategories: Category[] = [];
  toasterMessageText: string = '';
  toasterMessageStatus: boolean = false;
  isViewTransactionModal: boolean = false;
  isAddTransactionModal: boolean = false;
  categories: Category[] = [];
  transactions: Transaction[] = [];
  isWarning: boolean = false;
  currentDate: string = new Date().toISOString().substring(0, 10);

  dropdownSettings: IDropdownSettings = {
    singleSelection: false,
    idField: 'id',
    textField: 'title',
    selectAllText: 'Select All',
    unSelectAllText: 'UnSelect All',
    itemsShowLimit: 2,
    allowSearchFilter: true
  }

  transactionForm = this.fb.group({
    transactionType: ['income'],
    categories: ["", [Validators.required]],
    title: ["", [Validators.required, Validators.maxLength(128)]],
    amount: ["", [Validators.required]],
    date: [""],
    description: ["", [Validators.maxLength(256)]]
  })

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private dataservice: DataService,
    private categoryService: CategoriesService,
    private transactionsService: TransactionsService
  ) { }

  ngOnInit(): void {
    this.dataservice
      .currentAccountId
      .pipe(untilDestroyed(this))
      .subscribe((accountId) => {
        this.getTransactions(accountId);
        this.accountId = accountId;
      })

    this.dataservice
      .accounts
      .pipe(untilDestroyed(this))
      .subscribe((accounts) => {
        console.log(accounts);
        if (!accounts.length) {
          this.isAddAccountActive = false;
          this.isAddTransactionStatus = false;
        } else {
          this.isAddAccountActive = true;
          this.isAddTransactionStatus = true;
        }
      })

    this.getCategories('income');
  }

  getTransactions(accountId: number) {
    this.transactionsService
      .getTransactions(accountId)
      .pipe(untilDestroyed(this))
      .subscribe({
        next: data => {
          this.transactions = data.transactions
        }
      })
  }

  openAddAccountModal() {
    this.dataservice.sendAccountModalStatus(true);
  }

  openViewTransactionModal(transactionId: number) {
    this.transactionsService
      .getTransaction(transactionId)
      .pipe(untilDestroyed(this))
      .subscribe({
        next: data => {
          this.currentTransaction = data.transaction;
          this.currentTransactionCategories = data.transaction.categories;
        }
      })
      this.isViewTransactionModal = true;
  }

  openAddTransactionModal() {
    this.isAddTransactionModal = true;
  }

  closeViewTransactionModal() {
    this.isViewTransactionModal = false;
  }

  closeAddTransactionModal() {
    this.isAddTransactionModal = false;
  }

  onTransactionSubmit() {
    if (this.transactionForm.valid) {
      const { transactionType, categories, title, amount, date, description } = this.transactionForm.value;
      let categoryIds: number[] = []

      for (let category of categories) {
        categoryIds.push(category.id);
      }

      this.transactionsService
        .addTransaction(this.accountId, transactionType, categoryIds, title, amount, date, description)
        .pipe(untilDestroyed(this))
        .subscribe({
          next: data => {
            if (data.type === 'warning') {
              this.isWarning = true;
              this.toasterMessageText = data.message;
              this.toasterMessageStatus = true;
              setTimeout(() => {
                this.toasterMessageStatus = false;
              }, 2500)
            } else {
              this.isWarning = false;
              window.location.reload();
              this.toasterMessageText = data.message;
              this.toasterMessageStatus = true;
              setTimeout(() => {
                this.toasterMessageStatus = false;
                this.isAddTransactionModal = false;
              }, 2500)
            }
          },
          error: error => {
            console.log(error);
          }
        })
    }
  }

  getCategories(transactionType: string) {
    this.categoryService
      .getCategories(transactionType)
      .pipe(untilDestroyed(this))
      .subscribe({
        next: data => {
          this.categories = data.categories
        }
      })
  }

  changeTransactionType(transactionType: string) {
    this.getCategories(transactionType);
  }

}

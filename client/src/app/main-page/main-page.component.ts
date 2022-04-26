import { Component, OnInit } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { CategoriesService } from '../categories-page/services/categories.service';

import { Category } from '../models/category.model';
import { Transaction } from '../models/transaction.model';

import { DataService } from '../services/data.service';
import { TransactionsService } from './services/transactions.service';

@UntilDestroy()
@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})

export class MainPageComponent implements OnInit {

  orderType!: string;
  filterType!: string;
  deletedTransactionId!: number;

  accountId!: number;
  transaction!: Transaction;
  categories: Category[] = [];
  transactions: Transaction[] = [];
  currentTransactionCategories: Category[] = [];

  verifyModalStatus: boolean = false;

  orderedStatus: boolean = false;
  isAddAccountStatus: boolean = false;
  isAddTransactionStatus: boolean = false;

  isOpenAddTransactionModal: boolean = false;
  isOpenViewTransactionModal: boolean = false;

  isActiveIncomeTransactions: boolean = false;
  isActiveExpenseTransactions: boolean = false;

  constructor(
    private dataService: DataService,
    private categoryService: CategoriesService,
    private transactionsService: TransactionsService
  ) { }

  ngOnInit(): void {
    this.dataService
      .currentAccountId
      .pipe(untilDestroyed(this))
      .subscribe((accountId) => {
        this.accountId = accountId;
        this.getTransactions(accountId);
      })

    this.dataService
      .accounts
      .pipe(untilDestroyed(this))
      
      .subscribe((accounts) => {
        if (!accounts.length) {
          this.isAddAccountStatus = false;
          this.isAddTransactionStatus = false;
        } else {
          this.isAddAccountStatus = true;
          this.isAddTransactionStatus = true;
        }
      })

    this.getCategories('income');
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

  getTransactions(accountId: number, type: any = null, order: any = null, searchedText = '') {
    this.transactionsService
      .getTransactions(accountId, type, order)
      .pipe(untilDestroyed(this))
      .subscribe({
        next: data => {
          this.transactions = data.transactions
          this.transactions = this.transactions.filter(transaction => transaction.title.toLowerCase().includes(searchedText.toLowerCase()))
        }
      })
  }

  deleteTransaction() {
    this.transactionsService
      .deleteTransaction(this.deletedTransactionId)
      .pipe(untilDestroyed(this))
      .subscribe({
        next: data => {
          if (data.type === 'warning') {
            this.dataService.changeIsWarning(true);
          } else {
            this.dataService.changeIsWarning(false);
            this.verifyModalStatus = false;
            this.isOpenViewTransactionModal = false;
            this.getTransactions(
              this.accountId,
              this.filterType ? this.filterType : '',
              this.orderType ? this.orderType : ''
            )
          }
          this.dataService.changeToasterMessageStatus(true);
          this.dataService.changeToasterMessage(data.message);
          setTimeout(() => {
            this.dataService.changeToasterMessageStatus(false);
          }, 2500)
        }
      })
  }

  openAddAccountModal() {
    this.dataService.sendAccountModalStatus(true);
  }

  openAddTransactionModal() {
    this.isOpenAddTransactionModal = true;
  }

  closeAddTransactionModal() {
    this.isOpenAddTransactionModal = false;
  }

  openViewTransactionModal(transactionId: any) {
    this.isOpenViewTransactionModal = true;
    this.transactionsService
        .getTransaction(transactionId)
        .pipe(untilDestroyed(this))
        .subscribe({
          next: data => {
            this.transaction = data.transaction;
            this.currentTransactionCategories = data.transaction.categories;
          }
        })
  }

  closeViewTransactionModal() {
    this.isOpenViewTransactionModal = false;
  }

  openVerifyModal(transactionId: any) {
    this.verifyModalStatus = true;
    this.deletedTransactionId = transactionId;
  }

  closeVerifyModal() {
    this.verifyModalStatus = false;
  }

  changeTransactionType(transactionType: string) {
    this.getCategories(transactionType);
  }

  filterTansaction(type: any) {
    this.filterType = type;
    this.getTransactions(
      this.accountId,
      type,
      this.orderType ? this.orderType : null
    );
    if (type === 'income') {
      this.isActiveIncomeTransactions = !this.isActiveIncomeTransactions;
      if (!this.isActiveIncomeTransactions) this.getTransactions(this.accountId);
      if (this.isActiveExpenseTransactions) this.isActiveExpenseTransactions = false;
    }
    if (type === 'expense') {
      this.isActiveExpenseTransactions = !this.isActiveExpenseTransactions
      if (!this.isActiveExpenseTransactions) this.getTransactions(this.accountId);
      if (this.isActiveIncomeTransactions) this.isActiveIncomeTransactions = false;
    }
  }

  searchTansaction(searchedText: any) {
    this.getTransactions(
      this.accountId,
      this.filterType ? this.filterType : '',
      this.orderType ? this.orderType : '',
      searchedText
    )
  }

  orderTransactions(orderType: any) {
    this.orderType = orderType
    this.orderedStatus = !this.orderedStatus;
    this.getTransactions(
      this.accountId,
      this.filterType ? this.filterType : null,
      orderType
    );
  }
}

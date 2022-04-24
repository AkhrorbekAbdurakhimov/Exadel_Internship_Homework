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

  accountId!: number;
  transaction!: Transaction;
  categories: Category[] = [];
  transactions: Transaction[] = [];
  currentTransactionCategories: Category[] = [];

  isAddAccountStatus: boolean = false;
  isAddTransactionStatus: boolean = false;

  isOpenAddTransactionModal: boolean = false;
  isOpenViewTransactionModal: boolean = false;

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

  changeTransactionType(transactionType: string) {
    this.getCategories(transactionType);
  }
}

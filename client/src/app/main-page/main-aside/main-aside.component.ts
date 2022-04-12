import { Component, OnInit } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

import { Transaction } from './transaction.model';
import { TransactionsService } from '../services/transactions.service';
import { DataService } from 'src/app/global-components/services/data.service';

@UntilDestroy()
@Component({
  selector: 'app-main-aside',
  templateUrl: './main-aside.component.html',
  styleUrls: ['./main-aside.component.scss']
})

export class MainAsideComponent implements OnInit {
  accountId!: number;
  currentTransaction!: Transaction;
  isViewTransactionModel: boolean = false;
  transactions: Transaction[] = [];

  constructor(
    private dataservice: DataService,
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
          this.currentTransaction = data.transaction
        }
      })
      this.isViewTransactionModel = true;
  }

  closeViewTransactionModal() {
    this.isViewTransactionModel = false;
  }

}

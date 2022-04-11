import { Component, OnInit } from '@angular/core';

import { Transaction } from './transaction.model';
import { TransactionsService } from '../services/transactions.service';
import { DataService } from 'src/app/global-components/services/data.service';


@Component({
  selector: 'app-main-aside',
  templateUrl: './main-aside.component.html',
  styleUrls: ['./main-aside.component.scss']
})

export class MainAsideComponent implements OnInit {
  accountId!: number;
  transactions!: Transaction[];

  constructor(
    private dataservice: DataService,
    private transactionsService: TransactionsService
  ) { }

  ngOnInit(): void {
    this.dataservice.currentAccountId.subscribe((accountId) => {
      this.getTransactions(accountId);
      this.accountId = accountId;
    })
  }

  getTransactions(accountId: number) {
    this.transactionsService.getTransactions(accountId).subscribe({
      next: data => {
        this.transactions = data.transactions
      }
    })
  }

  openAddAccountModal() {
    this.dataservice.sendAccountModalStatus(true);
  }

}

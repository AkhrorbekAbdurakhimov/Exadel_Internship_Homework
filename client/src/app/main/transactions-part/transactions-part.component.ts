import { Component, OnInit } from '@angular/core';

import { Transaction } from './transaction.model';

import { AuthService } from 'src/app/auth/services/auth.service';
import { TransactionsService } from './../services/transactions.service'

@Component({
  selector: 'app-transactions-part',
  templateUrl: './transactions-part.component.html',
  styleUrls: ['./transactions-part.component.scss']
})

export class TransactionsPartComponent implements OnInit {
  transactions: Transaction[] = []

  constructor(private transactionsService: TransactionsService, private authService: AuthService) { }

  ngOnInit(): void {
    this.getTransactions()
  }

  getTransactions() {
    this.transactionsService.getTransactions().subscribe({
      next: data => {
        this.transactions = data.transactions
      },
      error: error => {
        if (error.status == 401) {
          this.authService.logout()
        }
      }
    })
  }
}

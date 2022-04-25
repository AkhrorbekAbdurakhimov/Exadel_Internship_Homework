import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Transaction } from 'src/app/models/transaction.model';

@Component({
  selector: 'app-transactions-list',
  templateUrl: './transactions-list.component.html',
  styleUrls: ['./transactions-list.component.scss']
})
export class TransactionsListComponent implements OnInit {

  @Input() transactions: Transaction[] = [];
  @Input() orderedStatus: boolean = false;

  @Output() searchTansaction: EventEmitter<any> = new EventEmitter();
  @Output() orderTransactions: EventEmitter<any> = new EventEmitter();
  @Output() openViewTransactionModal: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

}

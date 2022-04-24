import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Category } from 'src/app/models/category.model';

import { Transaction } from 'src/app/models/transaction.model';

@Component({
  selector: 'app-view-transaction',
  templateUrl: './view-transaction.component.html',
  styleUrls: ['./view-transaction.component.scss']
})
export class ViewTransactionComponent implements OnInit {

  @Input() categories: Category[] = []
  @Input() transaction!: Transaction;
  @Input() isOpenViewTransactionModal: boolean = false;

  @Output() closeViewTransactionModal: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

}

import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-right-sidebar',
  templateUrl: './right-sidebar.component.html',
  styleUrls: ['./right-sidebar.component.scss']
})
export class RightSidebarComponent implements OnInit {

  @Input() isAddAccountStatus: boolean = false;
  @Input() isAddTransactionStatus: boolean = false;
  @Input() isActiveIncomeTransactions: boolean = false;
  @Input() isActiveExpenseTransactions: boolean = false;

  @Output() filterTansaction: EventEmitter<any> = new EventEmitter();
  @Output() openAddAccountModal: EventEmitter<any> = new EventEmitter();
  @Output() openAddTransactionModal: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

}

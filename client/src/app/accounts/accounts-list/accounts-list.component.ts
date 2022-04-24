import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { Account } from 'src/app/models/account.model';

@Component({
  selector: 'app-accounts-list',
  templateUrl: './accounts-list.component.html',
  styleUrls: ['./accounts-list.component.scss']
})

export class AccountsListComponent implements OnInit {

  @Input() accounts: Account[] = [];

  @Output() openAddAccountModal: EventEmitter<any> = new EventEmitter();
  @Output() openViewAccountModal: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

}

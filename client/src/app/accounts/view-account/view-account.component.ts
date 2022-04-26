import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { Account } from 'src/app/models/account.model';

@Component({
  selector: 'app-view-account',
  templateUrl: './view-account.component.html',
  styleUrls: ['./view-account.component.scss']
})

export class ViewAccountComponent implements OnInit {

  @Input() account!: Account;
  @Input() isOpenViewAccountModal: boolean = false;

  @Output() openVerifyModal: EventEmitter<any> = new EventEmitter();
  @Output() closeViewAccountModal: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

}

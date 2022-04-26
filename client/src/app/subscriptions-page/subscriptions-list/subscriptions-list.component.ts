import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

import { Subscription } from 'src/app/models/subscription.model';

@Component({
  selector: 'app-subscriptions-list',
  templateUrl: './subscriptions-list.component.html',
  styleUrls: ['./subscriptions-list.component.scss']
})

export class SubscriptionsListComponent implements OnInit {

  @Input() subscriptions: Subscription[] = [];

  @Output() filterSubscriptions: EventEmitter<any> = new EventEmitter();
  @Output() openSubscriptioViewModal: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

}

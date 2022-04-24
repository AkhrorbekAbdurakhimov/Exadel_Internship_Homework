import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { Subscription } from 'src/app/models/subscription.model';

@Component({
  selector: 'app-subscription-view',
  templateUrl: './subscription-view.component.html',
  styleUrls: ['./subscription-view.component.scss']
})

export class SubscriptionViewComponent implements OnInit {

  @Input() subscription!: Subscription
  @Input() isOpenSubscriptionView!: boolean;
  @Input() currentSubscriptionCategories: string[] = []

  @Output() closeSubscripitonViewModal: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

}

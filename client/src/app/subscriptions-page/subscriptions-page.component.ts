import { Component, OnInit } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

import { Subscription } from '../models/subscription.model';

import { DataService } from '../services/data.service';
import { SubscriptionsService } from './services/subscriptions.service';

@UntilDestroy()
@Component({
  selector: 'app-subscriptions-page',
  templateUrl: './subscriptions-page.component.html',
  styleUrls: ['./subscriptions-page.component.scss']
})

export class SubscriptionsPageComponent implements OnInit {

  accountId!: number;
  subscription!: Subscription;
  subscriptions: Subscription[] = [];
  currentSubscriptionCategories: string[] = [];
  isOpenSubscriptionView: boolean = false;
  isOpenAddSubscriptionModal: boolean = false;

  constructor(
    private dataService: DataService,
    private subscriptionsservice: SubscriptionsService
  ) { }

  ngOnInit(): void {
    this.dataService
      .currentAccountId
      .pipe(untilDestroyed(this))
      .subscribe((accountId) => {
        this.accountId = accountId
        this.getSubscriptions({ accountId });
      })
  }

  getSubscriptions(params: any) {
    this.subscriptionsservice
      .getSubscriptions(params.accountId)
      .pipe(untilDestroyed(this))
      .subscribe({
        next: data => {
          this.subscriptions = data.subscriptions
          this.subscriptions = this.subscriptions.filter(subcription => subcription.title.includes(
            params.searchedText ? params.searchedText : ''
          ))
        }
      })
  }

  getSubscription(subscriptionId: number) {
    this.subscriptionsservice
      .getSubscription(subscriptionId)
      .pipe(untilDestroyed(this))
      .subscribe({
        next: data => {
          this.subscription = data.subscription
          this.currentSubscriptionCategories = this.subscription.categories
        }
      })
  }

  filterSubscriptions(searchedText: any) {
    this.getSubscriptions({ accountId: this.accountId, searchedText });
  }

  openSubscriptioViewModal(subscriptionId: number) {
    this.isOpenSubscriptionView = true;
    this.getSubscription(subscriptionId)
  }

  closeSubscripitonViewModal() {
    this.isOpenSubscriptionView = false;
  }

  openAddSubscriptionModal() {
    this.isOpenAddSubscriptionModal = true;
  }

  closeAddSubscriptionModal(addSubcriptionForm: any) {
    this.isOpenAddSubscriptionModal = false;
    addSubcriptionForm.reset()
  }

}

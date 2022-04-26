import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';

import { SharedModule } from '../shared/shared.module';
import { AccountsModule } from '../accounts/accounts.module';

import { SubscriptionsPageComponent } from './subscriptions-page.component';
import { RightSidebarComponent } from './right-sidebar/right-sidebar.component';
import { AddSubscriptionComponent } from './add-subscription/add-subscription.component';
import { SubscriptionViewComponent } from './subscription-view/subscription-view.component';
import { SubscriptionsListComponent } from './subscriptions-list/subscriptions-list.component';
import { LayoutModule } from '../layout/layout.module';

@NgModule({
  declarations: [
    RightSidebarComponent,
    AddSubscriptionComponent,
    SubscriptionViewComponent,
    SubscriptionsPageComponent,
    SubscriptionsListComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    LayoutModule,
    AccountsModule,
    ReactiveFormsModule,
    NgMultiSelectDropDownModule
  ],
  exports: [
    SubscriptionsPageComponent
  ]
})

export class SubscriptionsPageModule { }

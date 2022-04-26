import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from '../shared/shared.module';
import { LayoutModule } from '../layout/layout.module';

import { AccountsComponent } from './accounts.component';
import { AddAccountComponent } from './add-account/add-account.component';
import { ViewAccountComponent } from './view-account/view-account.component';
import { AccountsListComponent } from './accounts-list/accounts-list.component';
import { VerifyModalComponent } from './verify-modal/verify-modal.component';

@NgModule({
  declarations: [
    AccountsComponent,
    AccountsListComponent,
    ViewAccountComponent,
    AddAccountComponent,
    VerifyModalComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    LayoutModule,
    ReactiveFormsModule
  ],
  exports: [
    AccountsComponent
  ]
})
export class AccountsModule { }

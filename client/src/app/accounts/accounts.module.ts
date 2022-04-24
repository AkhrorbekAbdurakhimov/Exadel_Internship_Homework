import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms'

import { SharedModule } from '../shared/shared.module';

import { AccountsComponent } from './accounts.component';
import { AddAccountComponent } from './add-account/add-account.component';
import { ViewAccountComponent } from './view-account/view-account.component';
import { AccountsListComponent } from './accounts-list/accounts-list.component';



@NgModule({
  declarations: [
    AccountsComponent,
    AccountsListComponent,
    ViewAccountComponent,
    AddAccountComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule
  ],
  exports: [
    AccountsComponent
  ]
})
export class AccountsModule { }

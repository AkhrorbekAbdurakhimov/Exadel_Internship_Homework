import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';

import { SharedModule } from '../shared/shared.module';
import { LayoutModule } from '../layout/layout.module';
import { AccountsModule } from '../accounts/accounts.module';

import { AuthGuard } from '../auth/auth.guard';

import { MainPageComponent } from './main-page.component';
import { RightSidebarComponent } from './right-sidebar/right-sidebar.component';
import { TransactionsListComponent } from './transactions-list/transactions-list.component';
import { ViewTransactionComponent } from './view-transaction/view-transaction.component';
import { AddTransactionComponent } from './add-transaction/add-transaction.component';

const routes: Routes = [
  { path: '', component: MainPageComponent, canActivate: [AuthGuard] }
]

@NgModule({
  declarations: [
    MainPageComponent,
    TransactionsListComponent,
    RightSidebarComponent,
    ViewTransactionComponent,
    AddTransactionComponent
  ],
  imports: [
    NgMultiSelectDropDownModule.forRoot(),
    CommonModule,
    SharedModule,
    LayoutModule,
    AccountsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
  ],
  exports: [
    MainPageComponent,
  ]
})

export class MainPageModule { }

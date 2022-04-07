import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { SharedModule } from '../shared/shared.module';

import { MainComponent } from './main/main.component';
import { NavbarComponent } from './navbar/navbar.component';

import { AuthGuard } from '../auth/auth.guard';
import { AccountsSidebarComponent } from './accounts-sidebar/accounts-sidebar.component';
import { TransactionsPartComponent } from './transactions-part/transactions-part.component';
import { RightSidebarComponent } from './right-sidebar/right-sidebar.component';

const routes: Routes = [
  { path: '', component: MainComponent, canActivate: [AuthGuard] }
]

@NgModule({
  declarations: [
    MainComponent,
    NavbarComponent,
    AccountsSidebarComponent,
    TransactionsPartComponent,
    RightSidebarComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    MainComponent,
    NavbarComponent
  ]
})

export class MainModule { }

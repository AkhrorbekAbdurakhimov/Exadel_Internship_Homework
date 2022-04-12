import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { ReactiveFormsModule } from '@angular/forms'

import { SharedModule } from '../shared/shared.module';

import { HeaderComponent } from './header/header.component';
import { AccountsComponent } from './accounts/accounts.component';
import { SpinnerComponent } from './spinner/spinner.component';

@NgModule({
  declarations: [
    HeaderComponent,
    SpinnerComponent,
    AccountsComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule,
    ReactiveFormsModule
  ],
  exports: [
    HeaderComponent,
    SpinnerComponent,
    AccountsComponent,
  ]
})

export class GlobalComponentsModule { }

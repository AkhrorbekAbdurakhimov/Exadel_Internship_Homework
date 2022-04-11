import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReactiveFormsModule } from '@angular/forms'

import { SharedModule } from '../shared/shared.module';

import { HeaderComponent } from './header/header.component';
import { AccountsComponent } from './accounts/accounts.component';

@NgModule({
  declarations: [
    HeaderComponent,
    AccountsComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule
  ],
  exports: [
    HeaderComponent,
    AccountsComponent
  ]
})

export class GlobalComponentsModule { }

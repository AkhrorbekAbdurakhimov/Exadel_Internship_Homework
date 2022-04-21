import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

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
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})

export class GlobalComponentsModule { }

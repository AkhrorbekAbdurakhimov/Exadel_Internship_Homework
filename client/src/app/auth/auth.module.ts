import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { SharedModule } from '../shared/shared.module';

import { LoginFormComponent } from './login-form/login-form.component';

const routes: Routes = [
  { path: 'login', component: LoginFormComponent }
]

@NgModule({
  declarations: [
    LoginFormComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    LoginFormComponent
  ]
})

export class AuthModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { MainComponent } from './main/main.component';
import { AuthGuard } from '../auth/auth.guard';

const routes: Routes = [
  { path: '', component: MainComponent, canActivate: [AuthGuard] }
]

@NgModule({
  declarations: [
    MainComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})

export class MainModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';

import { SharedModule } from '../shared/shared.module';
import { GlobalComponentsModule } from '../global-components/global-components.module';

import { MainPageComponent } from './main-page.component';

import { AuthGuard } from '../auth/auth.guard';
import { MainAsideComponent } from './main-aside/main-aside.component';

const routes: Routes = [
  { path: '', component: MainPageComponent, canActivate: [AuthGuard] }
]

@NgModule({
  declarations: [
    MainPageComponent,
    MainAsideComponent
  ],
  imports: [
    NgMultiSelectDropDownModule.forRoot(),
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    GlobalComponentsModule,
    RouterModule.forChild(routes),
  ],
  exports: [
    MainPageComponent,
  ]
})

export class MainPageModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoriesPageComponent } from './categories-page.component';

import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { GlobalComponentsModule } from '../global-components/global-components.module';


@NgModule({
  declarations: [
    CategoriesPageComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    GlobalComponentsModule
  ],
  exports: [
    CategoriesPageComponent
  ]
})

export class CategoriesPageModule { }

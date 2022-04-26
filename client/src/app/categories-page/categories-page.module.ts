import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from '../shared/shared.module';
import { LayoutModule } from '../layout/layout.module';

import { CategoriesPageComponent } from './categories-page.component';
import { AddCategoryComponent } from './add-category/add-category.component';
import { VerifyModalComponent } from './verify-modal/verify-modal.component';
import { UpdateModalComponent } from './update-modal/update-modal.component';
import { RightSidebarComponent } from './right-sidebar/right-sidebar.component';
import { CategoriesListComponent } from './categories-list/categories-list.component';

@NgModule({
  declarations: [
    AddCategoryComponent,
    VerifyModalComponent,
    UpdateModalComponent,
    RightSidebarComponent,
    CategoriesPageComponent,
    CategoriesListComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    LayoutModule,
    ReactiveFormsModule
  ],
  exports: [
    CategoriesPageComponent,
  ]
})

export class CategoriesPageModule { }

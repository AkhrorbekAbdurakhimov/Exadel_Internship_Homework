import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoriesPageComponent } from './categories-page.component';

import { CategoriesListComponent } from './categories-list/categories-list.component';

import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { GlobalComponentsModule } from '../global-components/global-components.module';
import { RightSidebarComponent } from './right-sidebar/right-sidebar.component';
import { AddCategoryComponent } from './add-category/add-category.component';
import { ToasterMessageComponent } from './toaster-message/toaster-message.component';
import { VerifyModalComponent } from './verify-modal/verify-modal.component';
import { UpdateModalComponent } from './update-modal/update-modal.component';


@NgModule({
  declarations: [
    CategoriesPageComponent,
    CategoriesListComponent,
    RightSidebarComponent,
    AddCategoryComponent,
    ToasterMessageComponent,
    VerifyModalComponent,
    UpdateModalComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    GlobalComponentsModule
  ],
  exports: [
    CategoriesPageComponent,
  ]
})

export class CategoriesPageModule { }

import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

import { Category } from '../global-components/models/category.model';

import { CategoriesService } from './services/categories.service';

@UntilDestroy()
@Component({
  selector: 'app-categories-page',
  templateUrl: './categories-page.component.html',
  styleUrls: ['./categories-page.component.scss']
})

export class CategoriesPageComponent implements OnInit {

  verifyTitle: string = '';
  verifyMessage: string = '';
  deletedCategoryId!: number;
  categories: Category[] = [];
  toasterMessage: string = '';
  verifyModalStatus: boolean = false;
  isAddCategoryError: boolean = false;
  addCategoryErrorMessage: string = '';
  toasterMessageStatus: boolean = false;
  isOpenAddCategoryModal: boolean = false;
  selectedCategoryType: string = 'expense';
  isActiveIncomeCategories: boolean = false;
  isActiveExpenseCategories: boolean = false;
  isWarning: boolean = false;

  addCategoryForm = this.fb.group({
    categoryType: ['expense'],
    title: ['', [Validators.required]]
  })

  constructor(
    private fb: FormBuilder,
    private categoryService: CategoriesService
  ) { }

  ngOnInit(): void {
    this.getCategories();
  }

  getCategories(type: any = null, searchedText: string = '') {
    this.categoryService
      .getCategories(type)
      .pipe(untilDestroyed(this))
      .subscribe({
        next: data => {
          this.categories = data.categories
          this.categories = this.categories.filter(category => category.title.includes(searchedText))
        }
      })
  }

  addCategory() {
    if (this.addCategoryForm.valid) {
      const { categoryType, title } = this.addCategoryForm.value;
      this.categoryService
        .addCategory(categoryType, title)
        .pipe(untilDestroyed(this))
        .subscribe({
          next: data => {
            this.toasterMessageStatus = true;
            this.toasterMessage = data.message;
            this.isOpenAddCategoryModal = false;
            setTimeout(() => {
              this.toasterMessageStatus = false;
              window.location.reload()
            }, 2500)
          },
          error: error => {
            this.isAddCategoryError = true;
            this.addCategoryErrorMessage = error.error.message;
          }
        })
    }
  }

  filterCategory(type: string) {
    this.getCategories(type);
    if (type === 'income') {
      this.isActiveIncomeCategories = !this.isActiveIncomeCategories;
      if (!this.isActiveIncomeCategories) this.getCategories();
      if (this.isActiveExpenseCategories) this.isActiveExpenseCategories = false;
    }
    if (type === 'expense') {
      this.isActiveExpenseCategories = !this.isActiveExpenseCategories
      if (!this.isActiveExpenseCategories) this.getCategories();
      if (this.isActiveIncomeCategories) this.isActiveIncomeCategories = false;
    }
  }

  closeAddCategoryModal() {
    this.isOpenAddCategoryModal = false;
  }

  closeVerifyModal() {
    this.verifyModalStatus = false;
  }

  openAddCategoryModal() {
    this.isOpenAddCategoryModal = true;
  }

  openVerifyModal(categoryId: number, title: string, message: string) {
    this.verifyModalStatus = true;
    this.verifyTitle = title;
    this.verifyMessage = message;
    this.deletedCategoryId = categoryId;
  }

  searchCategory(searchedText: string) {
    this.getCategories(null, searchedText)
  }

  deleteCategory() {
    this.categoryService
      .deleteCategory(this.deletedCategoryId)
      .pipe(untilDestroyed(this))
      .subscribe({
        next: data => {
          this.isWarning = false;
          this.toasterMessage = data.message;
          this.toasterMessageStatus = true;
          setTimeout(() => {
            this.toasterMessageStatus = false;
            window.location.reload();
          }, 2500)
        },
        error: error => {
          this.isWarning = true;
          this.toasterMessage = error.error.message;
          this.toasterMessageStatus = true;
          setTimeout(() => {
            this.toasterMessageStatus = false;
          }, 2500)
        }
      })
  }
}

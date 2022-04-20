import { Component, OnInit } from '@angular/core';

import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

import { Category } from '../global-components/models/category.model';

import { DataService } from './services/data.service';
import { CategoriesService } from './services/categories.service';

@UntilDestroy()
@Component({
  selector: 'app-categories-page',
  templateUrl: './categories-page.component.html',
  styleUrls: ['./categories-page.component.scss']
})

export class CategoriesPageComponent implements OnInit {

  categories: Category[] = [];
  currentCategory!: Category;
  isActiveIncomeCategories: boolean = false;
  isActiveExpenseCategories: boolean = false;

  isOpenAddCategoryModal: boolean = false;
  isOpenUpdateCategoryModal: boolean = false;

  verifyTitle: string = '';
  verifyMessage: string = '';
  verifyModalStatus: boolean = false;
  deletedCategoryId!: number;


  constructor(
    private dataService: DataService,
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

  filterCategory(type: any) {
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

  searchCategory(searchedText: any) {
    this.getCategories(null, searchedText)
  }

  openAddCategoryModal() {
    this.isOpenAddCategoryModal = true;
  }

  closeAddCategoryModal() {
    this.isOpenAddCategoryModal = false;
  }

  openVerifyModal(categoryId: any) {
    this.verifyModalStatus = true;
    this.deletedCategoryId = categoryId;
  }

  closeVerifyModal() {
    this.verifyModalStatus = false;
  }

  deleteCategory() {
    this.categoryService
      .deleteCategory(this.deletedCategoryId)
      .pipe(untilDestroyed(this))
      .subscribe({
        next: data => {
          this.dataService.changeIsWarning(false);
          this.dataService.changeToasterMessageStatus(true);
          this.dataService.changeToasterMessage(data.message);
          this.closeVerifyModal()
          this.getCategories();
          setTimeout(() => {
            this.dataService.changeToasterMessageStatus(false);
          }, 2500)
        },
        error: error => {
          this.dataService.changeIsWarning(true);
          this.dataService.changeToasterMessageStatus(true);
          this.dataService.changeToasterMessage(error.error.message);
          setTimeout(() => {
            this.dataService.changeToasterMessageStatus(false);
          }, 2500)
        }
      })
  }

  openUpdateCategoryModal(category: any) {
    this.isOpenUpdateCategoryModal = true;
    this.currentCategory = category
  }

  closeUpdateCategoryModal() {
    this.isOpenUpdateCategoryModal = false;
  }
}

// export class CategoriesPageComponent implements OnInit {

//   isOpenUpdateCategoryModal: boolean = false;


//   deleteCategory() {
//     this.categoryService
//       .deleteCategory(this.deletedCategoryId)
//       .pipe(untilDestroyed(this))
//       .subscribe({
//         next: data => {
//           this.isWarning = false;
//           this.toasterMessage = data.message;
//           this.toasterMessageStatus = true;
//           setTimeout(() => {
//             this.toasterMessageStatus = false;
//             window.location.reload();
//           }, 2500)
//         },
//         error: error => {
//           this.isWarning = true;
//           this.toasterMessage = error.error.message;
//           this.toasterMessageStatus = true;
//           setTimeout(() => {
//             this.toasterMessageStatus = false;
//           }, 2500)
//         }
//       })
//   }

//   openUpdateCategoryModal(category: Category) {
//     this.isOpenUpdateCategoryModal = true;
//   }
// }

import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { FormBuilder, Validators } from '@angular/forms';

import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

import { DataService } from 'src/app/services/data.service';
import { CategoriesService } from '../services/categories.service';

@UntilDestroy()
@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.scss']
})

export class AddCategoryComponent implements OnInit {

  @Input() isOpenAddCategoryModal!: boolean;

  @Output() getCategories: EventEmitter<any> = new EventEmitter();
  @Output() closeAddCategoryModal: EventEmitter<any> = new EventEmitter();

  isAddCategoryError: boolean = false;
  addCategoryErrorMessage: string = ''

  addCategoryForm = this.fb.group({
    categoryType: ['expense'],
    title: ['', [Validators.required]]
  })

  constructor(
    private fb: FormBuilder,
    private dataService: DataService,
    private categoryService: CategoriesService
  ) { }

  ngOnInit(): void {
  }

  addCategory() {
    if (this.addCategoryForm.valid) {
      const { categoryType, title } = this.addCategoryForm.value;

      this.categoryService
        .addCategory(categoryType, title)
        .pipe(untilDestroyed(this))
        .subscribe({
          next: data => {
            this.dataService.changeToasterMessageStatus(true);
            this.dataService.changeToasterMessage(data.message);
            this.closeAddCategoryModal.emit();
            this.getCategories.emit();
            setTimeout(() => {
              this.dataService.changeToasterMessageStatus(false);
            }, 2500)
          },
          error: error => {
            this.isAddCategoryError = true;
            this.addCategoryErrorMessage = error.error.message;
            setTimeout(() => {
              this.isAddCategoryError = false;
              this.addCategoryErrorMessage = '';
            }, 2500)
          }
        })
    }
  }

}

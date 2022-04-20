import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';


import { Category } from 'src/app/global-components/models/category.model';

import { DataService } from '../services/data.service';
import { CategoriesService } from '../services/categories.service';

@UntilDestroy()
@Component({
  selector: 'app-update-modal',
  templateUrl: './update-modal.component.html',
  styleUrls: ['./update-modal.component.scss']
})

export class UpdateModalComponent implements OnInit {

  isUpdateCategoryError: boolean = false;
  updateCategoryErrorMessage: string = '';

  @Input() currentCategory!: Category;
  @Input() isOpenUpdateCategoryModal!: boolean;

  @Output() getCategories: EventEmitter<any> = new EventEmitter();
  @Output() closeUpdateCategoryModal: EventEmitter<any> = new EventEmitter();

  updateCategoryForm = this.fb.group({
    title: ['title', [Validators.required, Validators.maxLength(128)]]
  })

  constructor(
    private fb: FormBuilder,
    private dataService: DataService,
    private categoriesService: CategoriesService
  ) { }

  ngOnInit(): void {
  }

  updateCategory() {
    if (this.updateCategoryForm.valid) {
      const { title } = this.updateCategoryForm.value;
      this.categoriesService
        .updateCategory(this.currentCategory.id, title)
        .pipe(untilDestroyed(this))
        .subscribe({
          next: data => {
            this.dataService.changeToasterMessageStatus(true);
            this.dataService.changeToasterMessage(data.message);
            this.closeUpdateCategoryModal.emit();
            this.getCategories.emit()
            setTimeout(() => {
              this.dataService.changeToasterMessageStatus(false);
            }, 2500)
          },
          error: error => {
            this.isUpdateCategoryError = true;
            this.updateCategoryErrorMessage = error.error.message;
            setTimeout(() => {
              this.isUpdateCategoryError = false;
              this.updateCategoryErrorMessage = '';
            }, 2500)
          }
        })
    }
  }

}

import { Component, OnInit } from '@angular/core';

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

  categories: Category[] = []

  constructor(
    private categoryService: CategoriesService
  ) { }

  ngOnInit(): void {
    this.getCategories();
  }

  getCategories() {
    this.categoryService
      .getCategories()
      .pipe(untilDestroyed(this))
      .subscribe({
        next: data => {
          this.categories = data.categories
        }
      })
  }

}

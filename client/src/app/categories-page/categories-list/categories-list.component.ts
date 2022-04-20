import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';

import { Category } from '../../global-components/models/category.model';

@Component({
  selector: 'app-categories-list',
  templateUrl: './categories-list.component.html',
  styleUrls: ['./categories-list.component.scss']
})

export class CategoriesListComponent implements OnInit {

  @Input() categories: Category[] = [];
  @Output() searchCategory: EventEmitter<any> = new EventEmitter();
  @Output() openVerifyModal: EventEmitter<any> = new EventEmitter();
  @Output() openUpdateCategoryModal: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

}

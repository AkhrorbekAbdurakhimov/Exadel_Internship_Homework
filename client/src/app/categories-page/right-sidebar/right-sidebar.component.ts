import { Component, Output, OnInit, EventEmitter, Input  } from '@angular/core';

@Component({
  selector: 'app-right-sidebar',
  templateUrl: './right-sidebar.component.html',
  styleUrls: ['./right-sidebar.component.scss']
})

export class RightSidebarComponent implements OnInit {

  @Input() isActiveIncomeCategories: boolean = false;
  @Input() isActiveExpenseCategories: boolean = false;

  @Output() filterCategory: EventEmitter<any> = new EventEmitter();
  @Output() openAddCategoryModal: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

}

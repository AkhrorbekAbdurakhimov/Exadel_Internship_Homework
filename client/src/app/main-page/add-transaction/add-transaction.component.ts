import { FormBuilder, Validators } from '@angular/forms';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { Category } from 'src/app/models/category.model';

import { TransactionsService } from '../services/transactions.service';
import { DataService } from 'src/app/services/data.service';

@UntilDestroy()
@Component({
  selector: 'app-add-transaction',
  templateUrl: './add-transaction.component.html',
  styleUrls: ['./add-transaction.component.scss']
})

export class AddTransactionComponent implements OnInit {

  currentDate: string = new Date().toISOString().substring(0, 10);

  @Input() accountId!: number;
  @Input() categories: Category[] = [];
  @Input() isOpenAddTransactionModal: boolean = false;

  @Output() getTransactions: EventEmitter<any> = new EventEmitter();
  @Output() changeTransactionType: EventEmitter<any> = new EventEmitter();
  @Output() closeAddTransactionModal: EventEmitter<any> = new EventEmitter();

  dropdownSettings: IDropdownSettings = {
    singleSelection: false,
    idField: 'id',
    textField: 'title',
    selectAllText: 'Select All',
    unSelectAllText: 'UnSelect All',
    itemsShowLimit: 2,
    allowSearchFilter: true
  }

  transactionForm = this.fb.group({
    transactionType: ['income'],
    categories: [this.categories, [Validators.required]],
    title: ["", [Validators.required, Validators.maxLength(128)]],
    amount: ["", [Validators.required]],
    date: [""],
    description: ["", [Validators.maxLength(256)]]
  })

  constructor(
    private fb: FormBuilder,
    private dataService: DataService,
    private transactionsService: TransactionsService
  ) { }

  ngOnInit(): void {
  }

  onTransactionSubmit() {
    if (this.transactionForm.valid) {
      const { transactionType, categories, title, amount, date, description } = this.transactionForm.value;
      let categoryIds: number[] = []

      for (let category of categories) {
        categoryIds.push(category.id);
      }

      this.transactionsService
        .addTransaction(this.accountId, transactionType, categoryIds, title, amount, date, description)
        .pipe(untilDestroyed(this))
        .subscribe({
          next: data => {
            if (data.type === 'warning') {
              this.dataService.changeToasterMessageStatus(true);
              this.dataService.changeIsWarning(true);
              this.dataService.changeToasterMessage(data.message);
              setTimeout(() => {
                this.dataService.changeToasterMessageStatus(false);
              }, 2500)
            } else {
              this.dataService.changeIsWarning(true);
              this.dataService.changeToasterMessage(data.message);
              this.getTransactions.emit(this.accountId);
              this.closeAddTransactionModal.emit();
              setTimeout(() => {
                this.dataService.changeToasterMessageStatus(false);
              }, 2500)
            }
          }
        })
    }
  }


}

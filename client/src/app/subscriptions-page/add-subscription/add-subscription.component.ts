import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

import { SubscriptionsService } from '../services/subscriptions.service';

import { DataService } from 'src/app/services/data.service';

@UntilDestroy()
@Component({
  selector: 'app-add-subscription',
  templateUrl: './add-subscription.component.html',
  styleUrls: ['./add-subscription.component.scss']
})

export class AddSubscriptionComponent implements OnInit {

  addSubscriptionErrorStatus: boolean = false;
  addSubscriptionErrorMessage: string = ''
  currentDate: string = new Date().toISOString().substring(0, 10);
  categories: string[] = ['TV-show', 'Streaming', 'Entertainment', 'Lesson', 'Music', 'News', 'Football']

  dropdownSettings: IDropdownSettings = {
    singleSelection: false,
    idField: 'title',
    textField: 'title',
    selectAllText: 'Select All',
    unSelectAllText: 'UnSelect All',
    itemsShowLimit: 2,
    allowSearchFilter: true
  }

  addSubcriptionForm = this.fb.group({
    title: ['', [Validators.required, Validators.maxLength(128)]],
    categories: ['', [Validators.required]],
    amount: ['', [Validators.required]],
    initialDate: ['', [Validators.required]],
    lastDate: [null],
    description: ['', [Validators.maxLength(256)]]
  })

  @Input() isOpenAddSubscriptionModal: boolean = false;
  @Input() currentAccountId!: number;

  @Output() getSubscriptions: EventEmitter<any> = new EventEmitter()
  @Output() closeAddSubscriptionModal: EventEmitter<any> = new EventEmitter()

  constructor(
    private fb: FormBuilder,
    private dataService: DataService,
    private subscriptionsService: SubscriptionsService
  ) { }

  ngOnInit(): void {
  }

  submitSubcriptionForm() {
    if (this.addSubcriptionForm.valid) {
      const { title, categories, amount, initialDate, lastDate, description } = this.addSubcriptionForm.value;

      this.subscriptionsService
        .addSubscription(this.currentAccountId, title, categories, amount, initialDate, lastDate, description)
        .pipe(untilDestroyed(this))
        .subscribe({
          next: data => {
            this.dataService.changeToasterMessageStatus(true);
            this.dataService.changeToasterMessage(data.message);
            if (data.type === 'warning') {
              this.dataService.changeIsWarning(true)
            } else {
              this.getSubscriptions.emit({ accountId: this.currentAccountId });
              this.closeAddSubscriptionModal.emit();
              this.addSubcriptionForm.reset();
            }
            setTimeout(() => {
              this.dataService.changeToasterMessageStatus(false);
            }, 2500)
          },
          error: error => {
            if (error.status === 400) {
              this.addSubscriptionErrorStatus = true
              this.addSubscriptionErrorMessage = error.error.message
            }
          }
        })
    }
  }

}

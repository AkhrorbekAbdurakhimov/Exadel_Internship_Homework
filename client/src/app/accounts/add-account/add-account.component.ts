import { FormBuilder, Validators } from '@angular/forms';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { Currency } from 'src/app/models/currency.modal';
import { DataService } from 'src/app/services/data.service';
import { AccountsService } from '../services/accounts.service';

@UntilDestroy()
@Component({
  selector: 'app-add-account',
  templateUrl: './add-account.component.html',
  styleUrls: ['./add-account.component.scss']
})

export class AddAccountComponent implements OnInit {

  isCreateAccountError: boolean = false;
  createAccountErrorMessage: string = '';

  @Input() currencies: Currency[] = [];
  @Input() isOpenAddAccountModal: boolean = false;

  @Output() getAccounts: EventEmitter<any> = new EventEmitter();
  @Output() closeAddAccountModal: EventEmitter<any> = new EventEmitter();

  addAccountForm = this.fb.group({
    title: ['', [Validators.required, Validators.maxLength(128)]],
    currency: [0],
    description: [null, [Validators.maxLength(256)]]
  })

  constructor(
    private fb: FormBuilder,
    private dataService: DataService,
    private accountsService: AccountsService
  ) { }

  ngOnInit(): void {
  }

  addAccount() {
    if (this.addAccountForm.valid) {
      const { title, currency: currencyId, description } = this.addAccountForm.value;
      this.accountsService
        .createAccount(title, currencyId, description)
        .pipe(untilDestroyed(this))
        .subscribe({
          next: data => {
            this.dataService.changeToasterMessageStatus(true);
            this.dataService.changeToasterMessage(data.message);
            this.dataService.sendAccountModalStatus(false);
            this.getAccounts.emit();
            setTimeout(() => {
              this.dataService.changeToasterMessageStatus(false);
            }, 2500)
          },
          error: error => {
            this.isCreateAccountError = true;
            this.createAccountErrorMessage = error.error.message;
          }
        })
    }
  }

}

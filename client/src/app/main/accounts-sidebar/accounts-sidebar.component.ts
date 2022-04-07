import { Component, OnInit } from '@angular/core';

import { Account } from './account.model'

import { AccountsService } from './../services/accounts.service'
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-accounts-sidebar',
  templateUrl: './accounts-sidebar.component.html',
  styleUrls: ['./accounts-sidebar.component.scss']
})

export class AccountsSidebarComponent implements OnInit{

  accounts: Account[] = [];

  constructor(private accountsService: AccountsService, private authService: AuthService) { }

  ngOnInit() {
    this.getAccounts()
  }

  getAccounts() {
    this.accountsService.getAccounts().subscribe({
      next: data => {
        this.accounts = data.accounts
      },
      error: error => {
        console.log(error.status == 401);
        if (error.status == 401) {
          this.authService.logout()
        }
      }
    })
  }
}

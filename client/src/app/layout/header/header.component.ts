import { Component, OnInit } from '@angular/core';

import { AuthService } from 'src/app/auth/services/auth.service';

import { User } from '../../models/user.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent implements OnInit {
  user!: User;
  fullName: string = 'Maksim Verenich';

  constructor(
    private authservice: AuthService
  ) { }

  ngOnInit(): void {
    this.user = this.authservice.getUser()
    this.fullName = this.user.firstName + ' ' + this.user.lastName
  }

}

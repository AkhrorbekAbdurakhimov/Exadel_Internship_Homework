import { Component, OnInit } from '@angular/core';

import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

import { DataService } from 'src/app/services/data.service';

@UntilDestroy()
@Component({
  selector: 'app-toaster-message',
  templateUrl: './toaster-message.component.html',
  styleUrls: ['./toaster-message.component.scss']
})

export class ToasterMessageComponent implements OnInit {

  isWarning: boolean = false;
  toasterMessage: string = '';
  toasterMessageStatus: boolean = false;

  constructor(
    private dataService: DataService
  ) { }

  ngOnInit(): void {
    this.dataService
      .isWarning
      .pipe(untilDestroyed(this))
      .subscribe(status => this.isWarning = status)

    this.dataService
      .toasterMessage
      .pipe(untilDestroyed(this))
      .subscribe(message => this.toasterMessage = message)

    this.dataService
      .toasterMessageStatus
      .pipe(untilDestroyed(this))
      .subscribe(status => this.toasterMessageStatus = status)
  }

}

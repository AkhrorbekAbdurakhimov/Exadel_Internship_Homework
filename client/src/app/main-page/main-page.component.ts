import { Component, OnInit } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

import { SpinnerService } from '../global-components/services/spinner.service';

@UntilDestroy()
@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})

export class MainPageComponent implements OnInit {
  isSpinnerVisible: boolean = true;
  constructor(
    private spinnerService: SpinnerService,
  ) { }

  ngOnInit(): void {
    this.spinnerService
      .getIsSpinnerVisible$()
      .pipe(untilDestroyed(this))
      .subscribe((value: boolean) => {
        this.isSpinnerVisible = !value;
      });
  }
}

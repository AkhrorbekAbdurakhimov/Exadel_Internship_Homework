import { Component, OnInit } from '@angular/core';

import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

import { DataService } from '../services/data.service';
import { StatisticsService } from './services/statistics.service';

@UntilDestroy()
@Component({
  selector: 'app-statistics-page',
  templateUrl: './statistics-page.component.html',
  styleUrls: ['./statistics-page.component.scss']
})

export class StatisticsPageComponent implements OnInit {

  accountId!: number;

  statistics: {
    'title': string,
    'income': string,
    'expense': 'string'
  }[] = []

  totalIncome!: number;
  totalExpense!: number;

  constructor(
    private dataService: DataService,
    private statisticsService: StatisticsService
  ) { }

  ngOnInit(): void {
    this.dataService
      .currentAccountId
      .pipe(untilDestroyed(this))
      .subscribe(accountId => {
        this.accountId = accountId;
        this.getStatistics(this.accountId)
      });
  }

  getStatistics(accountId: number) {
    this.statisticsService
      .getStatistics(accountId)
      .pipe(untilDestroyed(this))
      .subscribe({
        next: data => {
          this.statistics = data.statistics;
          this.totalIncome = this.statistics.reduce((prev, current) => prev + +current.income, 0);
          this.totalExpense = this.statistics.reduce((prev, current) => prev + +current.expense, 0);
        }
      })
  }

}

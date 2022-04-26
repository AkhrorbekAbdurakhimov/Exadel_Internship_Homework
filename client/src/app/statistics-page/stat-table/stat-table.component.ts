import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-stat-table',
  templateUrl: './stat-table.component.html',
  styleUrls: ['./stat-table.component.scss']
})

export class StatTableComponent implements OnInit {

  @Input() statistics: {
    'title': string,
    'income': string,
    'expense': 'string'
  }[] = []

  @Input() totalIncome!: number;
  @Input() totalExpense!: number;

  constructor() { }

  ngOnInit(): void {
  }

}

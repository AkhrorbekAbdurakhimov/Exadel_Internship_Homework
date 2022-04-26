import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LayoutModule } from '../layout/layout.module';
import { SharedModule } from '../shared/shared.module';
import { AccountsModule } from '../accounts/accounts.module';

import { StatisticsPageComponent } from './statistics-page.component';
import { StatTableComponent } from './stat-table/stat-table.component';

@NgModule({
  declarations: [
    StatTableComponent,
    StatisticsPageComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    LayoutModule,
    AccountsModule,
  ],
  exports: [
    StatisticsPageComponent
  ]
})
export class StatisticsPageModule { }

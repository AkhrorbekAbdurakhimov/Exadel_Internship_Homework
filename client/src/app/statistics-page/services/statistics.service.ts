import { environment } from 'src/environments/environment';

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class StatisticsService {

  constructor(private http: HttpClient) { }

  getStatistics(accountId: number) {
    return this.http
      .get<any>(`${environment.apiUrl}/api/statistics/${accountId}`)
  }
}

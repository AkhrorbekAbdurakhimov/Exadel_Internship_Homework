import { environment } from 'src/environments/environment';

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class CurrenciesService {

  constructor(private http: HttpClient) { }

  getCurrencies() {
    return this.http
      .get<any>(`${environment.apiUrl}/api/currencies`)
  }
}

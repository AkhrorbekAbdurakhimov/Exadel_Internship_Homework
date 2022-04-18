import { environment } from 'src/environments/environment';

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class CategoriesService {

  constructor(
    private http: HttpClient
  ) { }

  getCategories(type: any = null) {
    return this.http
      .get<any>(`${environment.apiUrl}/api/categories${type ? `?type=${type}` : ''}`)
  }
}

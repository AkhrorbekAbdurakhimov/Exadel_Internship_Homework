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

  addCategory(type: string, title: string) {
    return this.http
      .post<any>(`${environment.apiUrl}/api/categories`, {
        type,
        title
      })
  }

  updateCategory(id: number, title: string) {
    return this.http
      .put<any>(`${environment.apiUrl}/api/categories/${id}`, {
        title
      })
  }

  deleteCategory(categoryId: number) {
    return this.http
      .delete<any>(`${environment.apiUrl}/api/categories/${categoryId}`)
  }
}

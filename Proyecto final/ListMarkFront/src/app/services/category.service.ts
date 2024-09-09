import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Category } from '../Models/Category';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService{
 private baseUrl = 'https://tu-api.com/api/Category';

  constructor(private http: HttpClient) { }

  getCategorys(): Observable<Category[]> {
    return this.http.get<Category[]>(`${this.baseUrl}`)
      .pipe(
        catchError(this.handleError)
      );
  }

  getCategoryById(id: number): Observable<Category> {
    return this.http.get<Category>(`${this.baseUrl}/GetById?id=${id}`)
      .pipe(
        catchError(this.handleError)
      );
  }

  getCategoryByName(name: string): Observable<Category> {
    return this.http.get<Category>(`${this.baseUrl}/${name}`)
      .pipe(
        catchError(this.handleError)
      );
  }

  createCategory(Category: Category): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}`, Category)
      .pipe(
        catchError(this.handleError)
      );
  }

  updateCategory(CategoryId: number, Category: Category): Observable<any> {
    return this.http.patch<any>(`${this.baseUrl}/${CategoryId}`, Category)
      .pipe(
        catchError(this.handleError)
      );
  }

  deleteCategory(CategoryId: number): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/${CategoryId}`)
      .pipe(
        catchError(this.handleError)
      );
  }

  private handleError(error: any) {
    console.error('Error en la solicitud:', error);
    return throwError(error);
  }
}

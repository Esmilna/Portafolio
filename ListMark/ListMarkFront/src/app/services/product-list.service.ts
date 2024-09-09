import { Injectable } from '@angular/core';
import { ProductList } from '../Models/ProductList';
import { Observable, catchError, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment ';

@Injectable({
  providedIn: 'root'
})
export class ProductListService {
  private baseUrl = environment.apiUrl + "/api/" + "ProductList";

  constructor(private http: HttpClient) { }

  getProductLists(): Observable<ProductList[]> {
    return this.http.get<ProductList[]>(`${this.baseUrl}`)
      .pipe(
        catchError(this.handleError)
      );
  }

  getProductListById(id: number): Observable<ProductList> {
    return this.http.get<ProductList>(`${this.baseUrl}/GetById?id=${id}`)
      .pipe(
        catchError(this.handleError)
      );
  }

  getProductListByName(name: string): Observable<ProductList> {
    return this.http.get<ProductList>(`${this.baseUrl}/${name}`)
      .pipe(
        catchError(this.handleError)
      );
  }

  createProductList(ProductList: ProductList): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}`, ProductList)
      .pipe(
        catchError(this.handleError)
      );
  }

  updateProductList(ProductListId: number, ProductList: ProductList): Observable<any> {
    return this.http.patch<any>(`${this.baseUrl}/${ProductListId}`, ProductList)
      .pipe(
        catchError(this.handleError)
      );
  }

  deleteProductList(ProductListId: number): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/${ProductListId}`)
      .pipe(
        catchError(this.handleError)
      );
  }

  private handleError(error: any) {
    console.error('Error en la solicitud:', error);
    return throwError(error);
  }
}

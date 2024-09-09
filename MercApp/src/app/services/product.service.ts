import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../Models/Product';
import { Observable, catchError, throwError } from 'rxjs';
import { environment } from '../environments/environment ';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private baseUrl =   environment.apiUrl + "/api/" + "Product";


  constructor(private http: HttpClient) { }

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.baseUrl}`)
      .pipe(
        catchError(this.handleError)
      );
  }

  getProductById(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.baseUrl}/GetById?id=${id}`)
      .pipe(
        catchError(this.handleError)
      );
  }

  getProductByName(name: string): Observable<Product> {
    return this.http.get<Product>(`${this.baseUrl}/${name}`)
      .pipe(
        catchError(this.handleError)
      );
  }

  createProduct(Product: Product): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}`, Product)
      .pipe(
        catchError(this.handleError)
      );
  }

  updateProduct(ProductId: number, Product: Product): Observable<any> {
    return this.http.patch<any>(`${this.baseUrl}/${ProductId}`, Product)
      .pipe(
        catchError(this.handleError)
      );
  }

  deleteProduct(ProductId: number): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/${ProductId}`)
      .pipe(
        catchError(this.handleError)
      );
  }

  private handleError(error: any) {
    console.error('Error en la solicitud:', error);
    return throwError(error);
  }
}

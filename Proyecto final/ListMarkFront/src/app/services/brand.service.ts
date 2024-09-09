import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Brand } from '../Models/Brand';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BrandService  {
  private baseUrl = 'https://tu-api.com/api/Brand';

  constructor(private http: HttpClient) { }

  getBrands(): Observable<Brand[]> {
    return this.http.get<Brand[]>(`${this.baseUrl}`)
      .pipe(
        catchError(this.handleError)
      );
  }

  getBrandById(id: number): Observable<Brand> {
    return this.http.get<Brand>(`${this.baseUrl}/GetById?id=${id}`)
      .pipe(
        catchError(this.handleError)
      );
  }

  getBrandByName(name: string): Observable<Brand> {
    return this.http.get<Brand>(`${this.baseUrl}/${name}`)
      .pipe(
        catchError(this.handleError)
      );
  }

  createBrand(brand: Brand): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}`, brand)
      .pipe(
        catchError(this.handleError)
      );
  }

  updateBrand(brandId: number, brand: Brand): Observable<any> {
    return this.http.patch<any>(`${this.baseUrl}/${brandId}`, brand)
      .pipe(
        catchError(this.handleError)
      );
  }

  deleteBrand(brandId: number): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/${brandId}`)
      .pipe(
        catchError(this.handleError)
      );
  }

  private handleError(error: any) {
    console.error('Error en la solicitud:', error);
    return throwError(error);
  }
}

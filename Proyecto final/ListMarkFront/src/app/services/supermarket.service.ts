import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { Supermarket } from '../Models/Supermarket';

@Injectable({
  providedIn: 'root'
})
export class SupermarketService {
  private baseUrl = 'https://tu-api.com/api/Supermarket';

  constructor(private http: HttpClient) { }

  getSupermarkets(): Observable<Supermarket[]> {
    return this.http.get<Supermarket[]>(`${this.baseUrl}`)
      .pipe(
        catchError(this.handleError)
      );
  }

  getSupermarketById(id: number): Observable<Supermarket> {
    return this.http.get<Supermarket>(`${this.baseUrl}/GetById?id=${id}`)
      .pipe(
        catchError(this.handleError)
      );
  }

  getSupermarketByName(name: string): Observable<Supermarket> {
    return this.http.get<Supermarket>(`${this.baseUrl}/${name}`)
      .pipe(
        catchError(this.handleError)
      );
  }

  createSupermarket(Supermarket: Supermarket): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}`, Supermarket)
      .pipe(
        catchError(this.handleError)
      );
  }

  updateSupermarket(SupermarketId: number, Supermarket: Supermarket): Observable<any> {
    return this.http.patch<any>(`${this.baseUrl}/${SupermarketId}`, Supermarket)
      .pipe(
        catchError(this.handleError)
      );
  }

  deleteSupermarket(SupermarketId: number): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/${SupermarketId}`)
      .pipe(
        catchError(this.handleError)
      );
  }

  private handleError(error: any) {
    console.error('Error en la solicitud:', error);
    return throwError(error);
  }
}
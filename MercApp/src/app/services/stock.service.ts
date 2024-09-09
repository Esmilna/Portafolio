import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Stock } from '../Models/Stock';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StockService {
  private baseUrl = 'https://tu-api.com/api/Stock';

  constructor(private http: HttpClient) { }

  getStocks(): Observable<Stock[]> {
    return this.http.get<Stock[]>(`${this.baseUrl}`)
      .pipe(
        catchError(this.handleError)
      );
  }

  getStockById(id: number): Observable<Stock> {
    return this.http.get<Stock>(`${this.baseUrl}/GetById?id=${id}`)
      .pipe(
        catchError(this.handleError)
      );
  }

  getStockByName(name: string): Observable<Stock> {
    return this.http.get<Stock>(`${this.baseUrl}/${name}`)
      .pipe(
        catchError(this.handleError)
      );
  }

  createStock(Stock: Stock): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}`, Stock)
      .pipe(
        catchError(this.handleError)
      );
  }

  updateStock(StockId: number, Stock: Stock): Observable<any> {
    return this.http.patch<any>(`${this.baseUrl}/${StockId}`, Stock)
      .pipe(
        catchError(this.handleError)
      );
  }

  deleteStock(StockId: number): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/${StockId}`)
      .pipe(
        catchError(this.handleError)
      );
  }

  private handleError(error: any) {
    console.error('Error en la solicitud:', error);
    return throwError(error);
  }
}
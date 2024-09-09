import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Details } from '../Models/Details';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DetailsService {
  private baseUrl = 'https://tu-api.com/api/Details';

  constructor(private http: HttpClient) { }

  getDetailss(): Observable<Details[]> {
    return this.http.get<Details[]>(`${this.baseUrl}`)
      .pipe(
        catchError(this.handleError)
      );
  }

  getDetailsById(id: number): Observable<Details> {
    return this.http.get<Details>(`${this.baseUrl}/GetById?id=${id}`)
      .pipe(
        catchError(this.handleError)
      );
  }

  getDetailsByName(name: string): Observable<Details> {
    return this.http.get<Details>(`${this.baseUrl}/${name}`)
      .pipe(
        catchError(this.handleError)
      );
  }

  createDetails(Details: Details): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}`, Details)
      .pipe(
        catchError(this.handleError)
      );
  }

  updateDetails(DetailsId: number, Details: Details): Observable<any> {
    return this.http.patch<any>(`${this.baseUrl}/${DetailsId}`, Details)
      .pipe(
        catchError(this.handleError)
      );
  }

  deleteDetails(DetailsId: number): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/${DetailsId}`)
      .pipe(
        catchError(this.handleError)
      );
  }

  private handleError(error: any) {
    console.error('Error en la solicitud:', error);
    return throwError(error);
  }
}
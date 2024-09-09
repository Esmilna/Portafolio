import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { ListDetails } from '../Models/ListDetails';

@Injectable({
  providedIn: 'root'
})
export class ListDetailsService {
  private baseUrl = 'https://tu-api.com/api/ListDetails';

  constructor(private http: HttpClient) { }

  getListDetailss(): Observable<ListDetails[]> {
    return this.http.get<ListDetails[]>(`${this.baseUrl}`)
      .pipe(
        catchError(this.handleError)
      );
  }

  getListDetailsById(id: number): Observable<ListDetails> {
    return this.http.get<ListDetails>(`${this.baseUrl}/GetById?id=${id}`)
      .pipe(
        catchError(this.handleError)
      );
  }

  getListDetailsByName(name: string): Observable<ListDetails> {
    return this.http.get<ListDetails>(`${this.baseUrl}/${name}`)
      .pipe(
        catchError(this.handleError)
      );
  }

  createListDetails(ListDetails: ListDetails): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}`, ListDetails)
      .pipe(
        catchError(this.handleError)
      );
  }

  updateListDetails(ListDetailsId: number, ListDetails: ListDetails): Observable<any> {
    return this.http.patch<any>(`${this.baseUrl}/${ListDetailsId}`, ListDetails)
      .pipe(
        catchError(this.handleError)
      );
  }

  deleteListDetails(ListDetailsId: number): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/${ListDetailsId}`)
      .pipe(
        catchError(this.handleError)
      );
  }

  private handleError(error: any) {
    console.error('Error en la solicitud:', error);
    return throwError(error);
  }
}
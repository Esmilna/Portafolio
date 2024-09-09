import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { List } from '../Models/List';
import { environment } from '../environments/environment ';

@Injectable({
  providedIn: 'root'
})
export class ListService {
  private baseUrl = environment.apiUrl + "/api/" + "List";

  constructor(private http: HttpClient) { }

  getLists(): Observable<List[]> {
    return this.http.get<List[]>(`${this.baseUrl}`)
      .pipe(
        catchError(this.handleError)
      );
  }

  getListById(id: number): Observable<List> {
    return this.http.get<List>(`${this.baseUrl}/GetById?id=${id}`)
      .pipe(
        catchError(this.handleError)
      );
  }

  getListByName(name: string): Observable<List> {
    return this.http.get<List>(`${this.baseUrl}/${name}`)
      .pipe(
        catchError(this.handleError)
      );
  }

  createList(List: List): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}`, List)
      .pipe(
        catchError(this.handleError)
      );
  }

  updateList(ListId: number, List: List): Observable<any> {
    return this.http.patch<any>(`${this.baseUrl}/${ListId}`, List)
      .pipe(
        catchError(this.handleError)
      );
  }

  deleteList(ListId: number): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/${ListId}`)
      .pipe(
        catchError(this.handleError)
      );
  }

  private handleError(error: any) {
    console.error('Error en la solicitud:', error);
    return throwError(error);
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Permission } from '../Models/Permission';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PermissionService {
  private baseUrl = 'https://tu-api.com/api/Permission';

  constructor(private http: HttpClient) { }

  getPermissions(): Observable<Permission[]> {
    return this.http.get<Permission[]>(`${this.baseUrl}`)
      .pipe(
        catchError(this.handleError)
      );
  }

  getPermissionById(id: number): Observable<Permission> {
    return this.http.get<Permission>(`${this.baseUrl}/GetById?id=${id}`)
      .pipe(
        catchError(this.handleError)
      );
  }

  getPermissionByName(name: string): Observable<Permission> {
    return this.http.get<Permission>(`${this.baseUrl}/${name}`)
      .pipe(
        catchError(this.handleError)
      );
  }

  createPermission(Permission: Permission): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}`, Permission)
      .pipe(
        catchError(this.handleError)
      );
  }

  updatePermission(PermissionId: number, Permission: Permission): Observable<any> {
    return this.http.patch<any>(`${this.baseUrl}/${PermissionId}`, Permission)
      .pipe(
        catchError(this.handleError)
      );
  }

  deletePermission(PermissionId: number): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/${PermissionId}`)
      .pipe(
        catchError(this.handleError)
      );
  }

  private handleError(error: any) {
    console.error('Error en la solicitud:', error);
    return throwError(error);
  }
}
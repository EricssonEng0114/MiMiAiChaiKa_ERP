import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, map, of, switchMap, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'https://localhost:44398/';
  private sessionName = 'webAPI_accessToken';
  private apiKey = '4kHn9zM?dHfuEYf5+y%NaqG&Q7FnR8';

  constructor(private http: HttpClient) { }

  private setToken(token: string, webAPIName: string): void {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem(this.sessionName + webAPIName, token);
    }
  }
//get token
  private getTokenFromStorage(webAPIName: string): string | null {
    if (typeof localStorage !== 'undefined') {
      return localStorage.getItem(this.sessionName + webAPIName);
    }
    return null;
  }

  private clearToken(): void {
    localStorage.removeItem('access_token');
  }

  getToken(userName: string, webAPIName: string): Observable<string> {
    const savedToken = this.getTokenFromStorage(webAPIName);

    if (savedToken) {
      return this.checkTokenValidity(savedToken).pipe(
        switchMap(isValid => isValid ? of(savedToken) : this.refreshToken(userName, webAPIName)),
        catchError(() => this.refreshToken(userName, webAPIName))
      );
    } else {
      return this.refreshToken(userName, webAPIName);
    }
  }

  private refreshToken(userName: string, webAPIName: string): Observable<string> {
    const url = `${this.apiUrl}UsersAPI/authenticate`;
    const body = { ApiAppName: webAPIName, ApiKey: this.apiKey };

    return this.http.post<{ access_token: string }>(url, body).pipe(
      map(response => response.access_token),
      tap(token => this.setToken(token, webAPIName)),
      catchError(this.handleError)
    );
  }

  private checkTokenValidity(accessToken: string): Observable<boolean> {
    const url = `${this.apiUrl}UsersAPI/checkAccessToken`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`
    });

    return this.http.post<boolean>(url, {}, { headers }).pipe(
      catchError(this.handleError)
    );
  }

  makeApiCall<T>(url: string, dataSend: any, userName: string = 'CUSTOMER', token: string): Observable<T> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    return this.http.post<any>(`${this.apiUrl}${url}`, dataSend, { headers }).pipe(
      map(response => {
        if (response.result === '1') {
          return response.resultset;
        } else {
          throw new Error('Failed to fetch data');
        }
      }),
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage: string;
    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = `Client-side error: ${error.error.message}`;
    } else {
      // Server-side error
      errorMessage = `Server-side error: ${error.status}\nMessage: ${error.message}`;
    }
    console.error(errorMessage); // Log error to console (optional)
    return throwError(() => new Error(errorMessage)); // Return observable error
  }
}

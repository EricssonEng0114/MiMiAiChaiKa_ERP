import { Injectable } from '@angular/core';
import { APIService } from '../Common/API/api.service';
import { environment } from '../../../environment';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private decryptKey = environment.dataDecryptKey;
  private apiUrl = environment.apiUrl;

  constructor(private apiServices: APIService, private http: HttpClient) { }

  login(dataSend: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, dataSend);
  }
}

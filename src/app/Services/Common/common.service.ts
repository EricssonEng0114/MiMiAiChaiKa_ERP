import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  private apiUrl = 'https://localhost:44398/';
  private sessionName = 'webAPI_accessToken';
  private apiKey = '4kHn9zM?dHfuEYf5+y%NaqG&Q7FnR8';

  constructor() { }
}

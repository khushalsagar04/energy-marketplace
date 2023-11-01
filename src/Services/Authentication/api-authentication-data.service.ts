import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

const API_URL = environment.baseApiURL;

@Injectable({
  providedIn: 'root'
})
export class ApiAuthenticationDataService {

  constructor(private http: HttpClient) { }

}

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { ApiAuthenticationStorageService } from '../Authentication/api-authentication-storage.service';

const provider = 'provider';

@Injectable({
  providedIn: 'root',
})
export class ApiGetUserIDService {
  constructor(
    private http: HttpClient,
    private apiAuthenticationStorageService: ApiAuthenticationStorageService
  ) {}

  public providerIOUT: any;

  private url = environment.baseApiURL + '/usermapper/userid/';

  token = this.apiAuthenticationStorageService.getUserToken();
  headers = new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization:
      'Bearer ' + this.apiAuthenticationStorageService.getUserToken(),
  });

  getuserID(userName: string): Observable<any> {
    return this.http.get(this.url + userName, { headers: this.headers });
  }

  providerID(userName: string): void {
    this.http.get(this.url + userName).subscribe((data: any) => {
      // search for the providerID in the json response
      data.forEach((element: any) => {
        this.saveProviderID(element.providerID);
      });
    });
  }

  // save the providerID in the local storage
  saveProviderID(provider: any): void {
    window.sessionStorage.removeItem('provider');
    window.sessionStorage.setItem('provider', JSON.stringify(provider));
  }

  // get the providerID from the local storage
  getProviderID(): any {
    return window.sessionStorage.getItem('provider');
  }
}

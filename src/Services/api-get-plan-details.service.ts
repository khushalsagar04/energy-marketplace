import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpHeaders } from '@angular/common/http';
import { ApiAuthenticationStorageService } from '../Services/Authentication/api-authentication-storage.service';

@Injectable({
  providedIn: 'root',
})
export class ApiGetPlanDetailsService {
  constructor(
    private http: HttpClient,
    private apiAuthenticationStorageService: ApiAuthenticationStorageService
  ) {}

  token = this.apiAuthenticationStorageService.getUserToken();

  data: any;
  
  headers = new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization:
      'Bearer ' + this.apiAuthenticationStorageService.getUserToken(),
  });

  private url = environment.baseApiURL;

  getPlanDetails(planId: string): Observable<any> {
    return this.http.get(`${this.url}/vendorplan/energyplans/${planId}`, {
      headers: this.headers,
    });
  }

  downloadFile(): string {
    return `${this.url}/csv/GetsampleCSVTemplate`;
  }
  getAllPlans(): Observable<any> {
    return this.http.get(`${this.url}/plan`);
  }
  postUpdate(postData: any): Observable<any>{
    return this.http.post(`${this.url}/publishplan/update`, postData)
  }
  postCSV(csvFile:any): Observable<any>{
    let newPlanData = new FormData();
    newPlanData.append('file', new Blob([csvFile],  {type: 'text/csv'}) , csvFile.name );
    return this.http.post(`${this.url}/csv/csvwriter`, newPlanData);
  }
  updatePlan(newDetails: any, planId: any): Observable<any>{
    return this.http.put<any>(`${this.url}/energyplan/update/${planId}`, newDetails)
  }
}

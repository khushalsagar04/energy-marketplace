import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class ApiGetService {
  constructor(private http: HttpClient) {}

  private url = environment.baseApiURL + '/energyplan';

  getPlanData(id: string): Observable<any> {
    return this.http.get(this.url + '/zipcode/' + id);
  }
}

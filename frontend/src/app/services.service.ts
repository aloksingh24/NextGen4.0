import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
@Injectable()
export class ServicesService {
  domain: 'http://localhost:8080';
  constructor(
    private http: Http
  ) { }

  registereEmployee(employee) {
    return this.http.post('http://localhost:8080/authentication/register', employee).map(res => res.json());
  }

  getDashboardData() {
    return this.http.get('http://localhost:8080/authentication/dashboard')
      .map(res => res.json());
  }
}

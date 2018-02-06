import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { tokenNotExpired } from 'angular2-jwt';
@Injectable()
export class ServicesService {
  domain: 'http://localhost:8080';
  authToken;
  emp;
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

  checkUserName(empName){
    return this.http.get('http://localhost:8080/authentication/checkemployeeName/' + empName).map(res => res.json());
  }

  login(emp){
    return this.http.post('http://localhost:8080/authentication/login',emp).map(res => res.json());
  }

  logout(){
  this.authToken = null;
  this.emp = null;
  localStorage.clear();
  }

  storeEmpData(token,emp){
   localStorage.setItem('token',token);
   localStorage.setItem('empName',JSON.stringify(emp) );
   this.authToken = token;
   this.emp = emp;
 }
 
 loggedIn() {
    return tokenNotExpired();
  }

}

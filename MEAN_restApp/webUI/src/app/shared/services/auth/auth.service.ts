import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baseURL: string = 'http://localhost:3000/api/auth/';
  constructor(private http: HttpClient, private _router: Router) { }
  loginuser(userData: any){
    return this.http.post(this.baseURL + 'login', userData);
  }
  registeruser(userData: any){
    return this.http.post(this.baseURL + 'register', userData);
  }
  loggedIn(){
    return !!localStorage.getItem('token')
  }
  logoutUser(){
    localStorage.removeItem('token')
    this._router.navigate(['api/auth/login'])
  }
  getToken(){
    return localStorage.getItem('token')
  }
}

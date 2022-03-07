import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
constructor(private _authservice: AuthService, private _router: Router){}

canActivate(): boolean{
  if(this._authservice.loggedIn()){ //Give access to the route if user loggedIn
    return true
  }else{
    this._router.navigate(['login']) //otherwise reroute the user to this
    return false
  }
}
}

import { Injectable, Injector } from '@angular/core';
import { HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { AuthService } from '../services/auth/auth.service';
@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {

  constructor(private _injector: Injector) { }
  intercept(req: HttpRequest<any>, next: HttpHandler){
    let authService = this._injector.get(AuthService) //injecting the dependency through _injector
    let tokenizedReq = req.clone({ //Cloning the request object because request object in immutable
        setHeaders:{
          Authorization: `Bearer ${authService.getToken()}` //getting this jwt header on every http request object
        }
      })
      return next.handle(tokenizedReq)
  }
}

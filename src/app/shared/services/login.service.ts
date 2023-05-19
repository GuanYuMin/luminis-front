import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  constructor(public http: HttpClient) { }

  fn_Login(datos: any): Observable<any>{
    return this.http.post(environment.apiURL + 'auth/login', datos, { observe: 'response' });
  }

  fn_Logout(datos: any): Observable<any>{
    return this.http.post(environment.apiURL + 'auth/logout', datos);
  }
}

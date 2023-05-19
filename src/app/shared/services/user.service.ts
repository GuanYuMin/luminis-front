import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(public http: HttpClient) { }

  fn_CreateUser(user: any): Observable<any>{
    return this.http.post(environment.apiURL + 'user/create_user', user, { observe: 'response' });
  }

  fn_UpdateUser(user: any, id: string): Observable<any>{
    return this.http.put(environment.apiURL + 'user/update_user/' + id, user);
  }

  fn_RecoverPassword(data: any): Observable<any>{
    return this.http.post(environment.apiURL + 'user/recovery_password', data);
  }
}

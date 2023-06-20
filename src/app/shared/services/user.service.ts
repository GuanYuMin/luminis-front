import { HttpClient, HttpHeaders } from '@angular/common/http';
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
    let headers = new HttpHeaders({
      'Authorization': localStorage.getItem("token") });
    let options = { headers: headers };
    return this.http.put(environment.apiURL + 'user/update_user/' + id, user, options);
  }

  fn_ChangePassword(user: any, id: string): Observable<any>{
    let headers = new HttpHeaders({
      'Authorization': localStorage.getItem("token") });
    let options = { headers: headers };
    return this.http.put(environment.apiURL + 'user/update_user_pwd/' + id, user, options);
  }

  fn_RecoverPassword(email: any): Observable<any>{
    return this.http.post(environment.apiURL + 'user/recovery_password', email, { observe: 'response' });
  }

  fn_GetUser(id: string): Observable<any>{
    return this.http.get(environment.apiURL + 'user/get_user/' + id, { observe: 'response' });
  }

  fn_GetUserTransactions(): Observable<any>{
    let headers = new HttpHeaders({
      'Authorization': localStorage.getItem("token") });
    let options = { headers: headers };
    return this.http.get(environment.apiURL + 'user/get_user_transactions', options);
  }

  fn_GetUserMemberships(): Observable<any>{
    let headers = new HttpHeaders({
      'Authorization': localStorage.getItem("token") });
    let options = { headers: headers };
    return this.http.get(environment.apiURL + 'user/get_user_memberships', options);
  }

  fn_GetUserQuestions(id: string): Observable<any>{
    return this.http.get(environment.apiURL + 'user/get_questions_by_user/' + id, { observe: 'response' });
  }
}

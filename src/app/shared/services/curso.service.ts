import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CursoService {
  constructor(public http: HttpClient) { }

  fn_ObtenerLista(): Observable<any>{
    return this.http.get(environment.apiURL + 'course/detail', { observe: 'response' });
  }

  fn_ObtenerDetalle(id: string): Observable<any>{
    let headers = new HttpHeaders({
      'Authorization': localStorage.getItem("token") });
    let options = { headers: headers };
    return this.http.get(environment.apiURL + 'course/detail/' + id, options);
  }

  fn_GetUserCourses(): Observable<any>{
    let headers = new HttpHeaders({
      'Authorization': localStorage.getItem("token") });
    let options = { headers: headers };
    return this.http.get(environment.apiURL + 'course/user_detail', options);
  }
}

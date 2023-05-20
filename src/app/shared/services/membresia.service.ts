import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class MembresiaService {
  constructor(public http: HttpClient) { }

  fn_ObtenerLista(): Observable<any>{
    return this.http.get(environment.apiURL + 'membership/detail', { observe: 'response' });
  }
}

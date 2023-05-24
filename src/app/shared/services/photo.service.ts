import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PhotoService {
  constructor(public http: HttpClient) { }

  fn_GetPhoto(id: string): Observable<any>{
    return this.http.get(environment.apiURL + 'photo/photos/' + id, { observe: 'response' });
  }

  fn_GetPhotos(): Observable<any>{
    return this.http.get(environment.apiURL + 'photo/photos', { observe: 'response' });
  }
}

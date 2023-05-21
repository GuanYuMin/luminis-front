import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class BlogService {
  constructor(public http: HttpClient) { }

  fn_ObtenerLista(): Observable<any>{
    return this.http.get(environment.apiURL + 'blog/get_blogs', { observe: 'response' });
  }

  fn_ObtenerBlog(id: string): Observable<any>{
      return this.http.get(environment.apiURL + 'blog/get_blog/' + id, { observe: 'response' });
    }
}

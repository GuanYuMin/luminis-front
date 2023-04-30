import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class VideoService {
  constructor(public http: HttpClient) { }
  
  fn_GetVideoList() { 
    return this.http.get(environment.apiURL + 'video/detail');
  }
}

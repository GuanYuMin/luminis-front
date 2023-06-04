import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  constructor(public http: HttpClient) { }

  fn_ProcessPayment(card: any, id: string): Observable<any>{
    let headers = new HttpHeaders({
      'Authorization': localStorage.getItem("token") });
    let options = { headers: headers }; //, observe: 'response'
    return this.http.post(environment.apiURL + 'openpay/openpay/purchase_membership/?id=' + id, card, options);
  }
}

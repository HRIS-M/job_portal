import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  simpleBaseUrl = environment.apiUrlSimple;

  constructor(private http: HttpClient) { }

  public createPaymentIntent() {
    const headers = new HttpHeaders({
      'Authorization': 'Basic ' + btoa('admin:password')
    });
    return this.http.post(`${this.simpleBaseUrl}/api/payments/create-payment-intent`, {}, {headers});
  }
}
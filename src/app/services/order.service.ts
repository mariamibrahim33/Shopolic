import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private apiURL = `${environment.apiBase}/order`;

  constructor(private http: HttpClient) {}

  placeOrder(order: any): Observable<any> {
    return this.http.post(this.apiURL, order);
  }

  getMyOrders(): Observable<any> {
    return this.http.get(this.apiURL);
  }
}

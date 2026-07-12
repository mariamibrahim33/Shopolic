import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private apiURL = 'http://localhost:3000/order';

  constructor(private http: HttpClient) {}

  placeOrder(order: any): Observable<any> {
    return this.http.post(this.apiURL, order);
  }

  getMyOrders(): Observable<any> {
    return this.http.get(this.apiURL);
  }
}

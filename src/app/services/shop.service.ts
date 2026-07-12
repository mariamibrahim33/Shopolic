import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ShopService {

  constructor(private _http:HttpClient) {

   }
 apiURL = `${environment.apiBase}/product`;
uploadURL = `${environment.apiBase}/assets/`;

   getProducts(category?:string):Observable<any>{
   const url = category ? `${this.apiURL}?category=${category}` : this.apiURL;
   return this._http.get<any[]>(url);
   }

   addProduct(product:FormData):Observable<any>{
    return this._http.post(this.apiURL,product);
   }
    
}
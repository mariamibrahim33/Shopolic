import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShopService {

  constructor(private _http:HttpClient) {

   }
 apiURL ='http://localhost:3000/product'
uploadURL='http://localhost:3000/assets'

   getProducts(category?:string):Observable<any>{
   const url = category ? `${this.apiURL}?category=${category}` : this.apiURL;
   return this._http.get<any[]>(url);
   }

   addProduct(product:FormData):Observable<any>{
    return this._http.post(this.apiURL,product);
   }
    
}
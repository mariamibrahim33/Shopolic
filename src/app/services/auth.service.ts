import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private tokenSubject: BehaviorSubject<string | null> = 
    new BehaviorSubject<string | null>(null);

  apiURL = 'http://localhost:3000/user/login';

  constructor(private _http: HttpClient) {
    const token = localStorage.getItem('accessToken');
    if (token) {
      this.tokenSubject.next(token);
    }
  }

  login(loginData: any): Observable<any> {
    return this._http.post<any>(this.apiURL, loginData).pipe(
      tap(res => {
        const token = res.accessToken;
        if (token) {
          localStorage.setItem('accessToken', token);
          this.tokenSubject.next(token);
          console.log(res.accessToken);
        }
      })
    );
  }

  getAccessToken(): Observable<string | null> {
    return this.tokenSubject.asObservable();
  }

  logout() {
    this.tokenSubject.next(null);
    localStorage.removeItem('accessToken');
  }

  // Renamed to isLoggedIn()
  isLoggedIn(): boolean {
    return this.tokenSubject.value !== null;
  }

  decodeAccessToken(): any {
    const token = this.tokenSubject.value;
    if (token) {
      return jwtDecode<any>(token);
    }
    return null;
  }

  getUserName(): string | null {
    const decoded = this.decodeAccessToken();
    return decoded ? decoded.name : null;
  }
}

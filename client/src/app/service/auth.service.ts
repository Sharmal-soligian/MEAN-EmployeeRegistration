import { Observable, catchError, tap } from 'rxjs';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Auth } from '../model/auth.model';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  readonly api = environment.base_url;
  headers: HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json'
  });

  constructor(
    private http: HttpClient
  ) { }

  getRegisteredUsers(): Observable<Auth[]>  {
    return this.http.get<Auth[]>(`${this.api}/register`);
  }

  createRegister(auth: Auth): Observable<Auth> {
    return this.http.post<Auth>(`${this.api}/register`, auth, {
      headers: this.headers
    });
  }

  loginUser(name: String, password: String): Observable<any> {
    const loginData = { name, password }
    return this.http.post<any>(`${this.api}/login`, loginData, {
      headers: this.headers,
    }).pipe(
      tap(res => {
        if(res && res?.token) {
          localStorage.setItem('token', res?.token);
        }
      }),
      catchError(err => {
        console.log('Error while login', err);
        throw err;
      })
    );
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  logOut() {
    return localStorage.removeItem('token');
  }
}

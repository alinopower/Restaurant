import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthResponseDataModel } from './auth/auth-response-data-model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

 // API_KEY = "AIzaSyBbb8Z6xy7rHAYIxrkZmKKmv4Im4oORVB0";
  constructor(private http: HttpClient) { }

  signUp(email: string, password: string) {
     return this.http.post<AuthResponseDataModel>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=[AIzaSyBbb8Z6xy7rHAYIxrkZmKKmv4Im4oORVB0]',{
      email: email,
      password: password,
      returnSecureToken: true
    }
    );
  }
}

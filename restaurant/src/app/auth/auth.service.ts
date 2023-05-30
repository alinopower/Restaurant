import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Subject, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { AuthResponseDataModel } from './auth/auth-response-data-model';
import { UserModel } from './user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  //userSubject = new Subject<UserModel>(); je prefère utiliser le BehaviorSubject5le sujet comportemental) qui fonctionne de la 
  //mème manière que Subjet à la seulle diference qu'il donne aux abonés un accès immédiat à la valeur précédemment émise mème si 
  //ils ne se st pas abonnés au moment où cette valeur à été émise. Dc ns puvons avoir accès à l'utilisateur actif mème si nous ne nous 
  // inscrivons qu'après que cet utilisateur ait été émis 
  userSubject = new BehaviorSubject<UserModel>(null);
  private tokenExpirationTimer: any;

  constructor(private http: HttpClient,
              private router: Router) { }

  //tap() est un operateur rxjs qui nous permet  d'effectuer une action sans changer la reponse.

  signUp(email: string, password: string) {
    return this.http.post<AuthResponseDataModel>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBbb8Z6xy7rHAYIxrkZmKKmv4Im4oORVB0', {
      email: email,
      password: password,
      returnSecureToken: true
    }
    ).pipe(
      catchError(this.handleError),
      tap(resData => {
        this.handleAuthentication(resData.email, resData.localId, resData.idToken, +resData.expiresIn);
      })
    );
  }


  login(email: string, password: string) {
    return this.http.post<AuthResponseDataModel>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBbb8Z6xy7rHAYIxrkZmKKmv4Im4oORVB0',
      {
        email: email,
        password: password,
        returnSecureToken: true
      }
    ).pipe(
      catchError(this.handleError),
      tap(resData => {
        this.handleAuthentication(resData.email, resData.localId, resData.idToken, +resData.expiresIn);
      })
    );
  }

  logout(){
    this.userSubject.next(null);
    this.router.navigate(['/auth']);
    //localStorage.clear();// utiliser ceci supprimera tous les données du localStorage et nous n voulons pas ça
    localStorage.removeItem('userData');
    if( this.tokenExpirationTimer){
      clearTimeout(this.tokenExpirationTimer);
    }
    this.tokenExpirationTimer  = null;
  }

  // permet de maintenir la session de l'utilisateur en cours lorsqu'on recharge la page
  autoLogOut(expirationDuration: number){
    console.log(expirationDuration);
   this.tokenExpirationTimer = setTimeout(() => {
   this.logout();
    }, expirationDuration)
  }


  // permet de maintenir la session de l'utilisateur en cours lorsqu'on recharge la page
  autoLogin(){
   const userData: {
    email: string;
    id: string;
    _token: string;
    _tokenExpirationDate: string;
   } = JSON.parse(localStorage.getItem('userData'));
   if (!userData){
    return;
   }
   const loadedUser = new UserModel(
    userData.email,
    userData.id, 
    userData._token, 
    new Date(userData._tokenExpirationDate)
    );

    if (loadedUser.token){
      this.userSubject.next(loadedUser);
      const expirationDuration = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime();
      this.autoLogOut(expirationDuration);
    }
  }

  private handleAuthentication(email: string, userId: string, token: string, expiresIn: number) {
    const expirationDate = new Date(new Date().getTime() + +expiresIn * 1000);
    const user = new UserModel(email, userId, token, expirationDate);
    this.userSubject.next(user);
    this.autoLogOut(expiresIn * 1000);
    localStorage.setItem('userData', JSON.stringify(user))
  }


  private handleError(errorRes: HttpErrorResponse) {

    let errorMessage = 'An unknown error occur!!';
    if (!errorRes.error || !errorRes.error.error) {
      return throwError(errorMessage);
    }
    switch (errorRes.error.error.message) {
      case 'EMAIL_EXISTS': errorMessage = 'This Email exist already';
        break;
      case 'EMAIL_NOT_FOUND': errorMessage = "This Email does not exist";
        break;
      case 'INVALID_PASSWORD': errorMessage = 'This password is invalid';
        break;
    }
    return throwError(errorMessage);

  }
}

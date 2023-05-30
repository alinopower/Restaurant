// ce service permet d'empecher l'accès à travers les routes dans la bar de navigation

import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { map, take, tap } from 'rxjs/operators';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private authService: AuthService,
    private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    return this.authService.userSubject.pipe(
      take(1),
      map(user => {
        const isAuth = !!user;
        if (isAuth){
          return true;
        }
        return this.router.createUrlTree(['/auth']);
      })
    //, tap(isAuth => {
    //   if (!isAuth) {
    //     this.router.navigate(['/auth']);
    //   }
    // })
    );
    // throw new Error('Method not implemented.');
  }
}

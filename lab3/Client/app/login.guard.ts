import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

import {AuthService} from './services/auth.service';
import {Observable} from "rxjs/Observable";

@Injectable()
export class LoginGuard implements CanActivate {

  constructor(private router: Router, private authService: AuthService) {}

  canActivate(): Observable<boolean> {
    if (!localStorage.getItem('currentUser')) {
      this.router.navigate(['/login']);
      return Observable.of(false);
    }

    let result = this.authService.checkToken(JSON.parse(localStorage.getItem('currentUser')).token);
    console.log(result);
    return result;
  }

}

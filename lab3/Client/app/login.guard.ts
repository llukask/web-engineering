import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

import {AuthService} from './services/auth.service';

@Injectable()
export class LoginGuard implements CanActivate {

  constructor(private router: Router, private authService: AuthService) {}

  canActivate(): Promise<boolean> {
    if (!localStorage.getItem('currentUser')) {
      this.router.navigate(['/login']);
      return Promise.resolve(false);
    }

    var result = this.authService.checkToken(localStorage.getItem('currentUser'));
    console.log(result);
    return result;
  }

}

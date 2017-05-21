import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {NgForm} from '@angular/forms';

import {AuthService} from '../services/auth.service';

@Component({
    moduleId: module.id,
    selector: 'my-login',
    templateUrl: '../views/login.html'
})
export class LoginComponent implements OnInit {

    loginError: boolean = false;

    constructor(private router: Router, private authService: AuthService) {
    }

    ngOnInit() {
      this.authService.logout();
    }

    onSubmit(form: NgForm): void {
        // Überprüfen Sie die Login-Daten über die REST-Schnittstelle und leiten Sie den Benutzer bei Erfolg auf die Overview-Seite weiter
        if(!form.valid) return;
        this.authService.login(form.value['username'],form.value['password']).subscribe(result =>  {
          if(result === true) {
            this.router.navigate(['/overview']);
          } else {
            alert("Login Failed");
          }
        })
    }
}

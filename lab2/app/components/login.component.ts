import { Component } from '@angular/core';
import { Router } from '@angular/router';
//import {isNullOrUndefined} from "util";

@Component({
  moduleId: module.id,
  selector: 'my-app',
  templateUrl: '../views/loginView.html'
})
export class LoginComponent {
  static router: Router;
  constructor(private  router: Router) {
    this.router = router;
  }

  login(userName: String, password: String): void {
    if(/*isNullOrUndefined(userName) || isNullOrUndefined(password) || */userName === '' || password === '') {
      console.log("No valid login!")
    } else {
      console.log("Redirecting to overview!");
      this.router.navigate(["overview"]);
    }
  }
}

import { Injectable } from '@angular/core';
import {Http, Headers, Response, RequestOptions} from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/take'

@Injectable()
export class AuthService {
    public token: string;

    constructor(private http: Http) {
        // set token if saved in local storage
        var currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.token = currentUser && currentUser.token;
    }

    checkToken(token: string) : Observable<boolean> {
        console.log("Trying to auth with token: " + token);
        let headers = new Headers({ 'token': token });
        let options = new RequestOptions({ headers: headers });
        return this.http.get('http://localhost:8081/auth', options)
          .map((response: Response) => {
            let valid = response.json() && response.json().valid;
            console.log("Auth: " + response.text());
            return valid;
          });
    }

    login(username: string, password: string): Observable<boolean> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        return this.http.post('http://localhost:8081/auth', JSON.stringify({ username: username, password: password }), options)
            .map((response: Response) => {
                //console.log(response.text());
                let token = response.json() && response.json().token;
                //console.log(token);
                if (token) {
                    this.token = token;
                    localStorage.setItem('currentUser', JSON.stringify({ username: username, token: token }));
                    return true;
                } else {
                    return false;
                }
            });
    }

    logout(): Observable<void> {
        console.log("authService: logout");
        let token = this.token;
        this.token = null;
        localStorage.removeItem('currentUser');
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        console.log(this.token);
        return this.http.post('http://localhost:8081/deauth', JSON.stringify({ token: token }), options)
          .map((response: Response) => {
            let message = response.json() && response.json().message;
            console.log(message);
        });
    }
}

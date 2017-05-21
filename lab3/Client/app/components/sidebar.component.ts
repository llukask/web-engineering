import {Component, OnInit} from "@angular/core";

import 'rxjs/add/operator/toPromise';
import {Http, HttpModule, Request, RequestOptions, Response, Headers} from "@angular/http";
import {Observable} from "rxjs/Observable";

@Component({
    moduleId: module.id,
    selector: 'my-sidebar',
    templateUrl: '../views/sidebar.component.html'
})
export class SidebarComponent implements OnInit{

    failed_logins: number = 0;
    server_start: Date = new Date();

    constructor(private http: Http){}

    ngOnInit(): void {
        //TODO Lesen Sie über die REST-Schnittstelle den Status des Servers aus und speichern Sie diesen in obigen Variablen
        this.http.get("http://localhost:8081/state").map((response: Response) => {
            let state = response.json();
            console.log(JSON.stringify(state));
            this.failed_logins = state['failed_logins'];
        });
    }


}

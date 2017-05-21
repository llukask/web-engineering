import {Device} from '../model/device';
import {Injectable} from '@angular/core';

import {DEVICES} from '../resources/mock-device';
import {DeviceParserService} from './device-parser.service';

import 'rxjs/add/operator/toPromise';
import {Http, HttpModule, Request, RequestOptions, Response, Headers} from "@angular/http";
import {Observable} from "rxjs/Observable";


@Injectable()
export class DeviceService {

    constructor(private parserService: DeviceParserService, private http: Http) {
    }

    //TODO Sie können dieses Service benutzen, um alle REST-Funktionen für die Smart-Devices zu implementieren

    private static handleError (error: Response | any) {
        // In a real world app, you might use a remote logging infrastructure
        let errMsg: string;
        if (error instanceof Response) {
            const body = error.json() || '';
            const err = body.error || JSON.stringify(body);
            errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
        } else {
            errMsg = error.message ? error.message : error.toString();
        }
        console.error(errMsg);
        return Observable.throw(errMsg);
    }

    changeName(id: string, newName: string) : void {
        console.log("Changing name for device " + id + " to " + newName);
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        Promise.resolve(this.http.post("http://localhost:8081/devices/" + id, JSON.stringify({display_name: newName}), options).toPromise());
    }

    getDevices(): Promise<Device[]> {
        /*
         * Verwenden Sie das DeviceParserService um die via REST ausgelesenen Geräte umzuwandeln.
         * Das Service ist dabei bereits vollständig implementiert und kann wie unten demonstriert eingesetzt werden.
         */

        return this.http.get("http://localhost:8081/devices").map((response: Response) => {
            let devs = response.json() as Device[];
            console.log(JSON.stringify(devs));
            return devs.map((dev) => {
                console.log(dev);
                return this.parserService.parseDevice(dev);
            });
        }).toPromise();
    }



    getDevice(id: string): Promise<Device> {
        return this.getDevices()
            .then(devices => devices.find(device => device.id === id));
    }

}

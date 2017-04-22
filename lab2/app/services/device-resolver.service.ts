import {Device} from "../model/device";
import {ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot} from "@angular/router";
import {DeviceService} from "./device.service";
import {Injectable} from "@angular/core";

@Injectable()
export class DeviceResolver implements Resolve<Device> {
  constructor(private ds: DeviceService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<Device> {
    let id = route.params['id'];
    console.log(id);

    return this.ds.getDevice(id).then(device => {
      if(device) {
        return device
      } else {
        this.router.navigate(['/overview']);
        return null;
      }
    })
  }
}
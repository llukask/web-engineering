import {Component, Inject} from '@angular/core';
import {Device} from "../model/device";
import {DeviceService} from "../services/device.service";

@Component({
    moduleId: module.id,
    selector: 'overview',
    templateUrl: '../views/overviewView.html',
    host: {
        class: 'main-container'
    },
})
export class OverviewComponent {
    devices: Promise<Device[]>;
    constructor(private  deviceService: DeviceService) {
        this.devices = deviceService.getDevices();
    }
}

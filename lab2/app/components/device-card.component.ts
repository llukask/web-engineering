import {Component, Input} from '@angular/core';
import {Device} from "../model/device";

@Component({
    moduleId: module.id,
    selector: 'device-card',
    templateUrl: '../views/deviceCardView.html'
})
export class DeviceCardComponent {
    @Input() device : Device;
}

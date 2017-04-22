import {Component, Input} from '@angular/core';
import {Device} from "../model/device";

@Component({
    moduleId: module.id,
    selector: 'device-card',
    templateUrl: '../views/deviceCardView.html'
})
export class DeviceCardComponent {
    @Input() device : Device;
    isEdit: boolean;

    toggleEdit(newName: string) {
        if(this.isEdit) {
            this.save(newName);
        } else {
            this.edit();
        }
    }

    edit() {
        this.isEdit = true;
    }

    save(newName: string) {
        this.device.display_name = newName;
        this.isEdit = false;
    }
}

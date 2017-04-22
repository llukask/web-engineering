import {Component, Input, OnInit} from '@angular/core';
import {Device} from "../model/device";
import {ControlUnit} from "../model/controlUnit";

@Component({
    moduleId: module.id,
    selector: 'device-card',
    templateUrl: '../views/deviceCardView.html'
})
export class DeviceCardComponent implements OnInit{
    @Input() device : Device;
    isEdit: boolean;

    ngOnInit() {
        let primaryControl: ControlUnit = this.device.control_units.find((cu) => cu.primary);
        let id: string = "device-image-" + this.device.id;
        let image: string = this.device.image;
        let min: number = primaryControl.min;
        let max: number = primaryControl.max;
        let current: number = primaryControl.current;
        let values: string[] = primaryControl.values;
        console.log("Calling draw_image with id=" + id + ", image=" + image + ", min=" + min + ", max=" + max +
            ", current=" + current + ", values=" + JSON.stringify(values));
        this.device.draw_image(id, image, min, max, current, values);
    }

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
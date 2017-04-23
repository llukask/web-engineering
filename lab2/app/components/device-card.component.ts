import {AfterViewInit, Component, Input, OnInit} from '@angular/core';
import {Device} from "../model/device";
import {ControlUnit} from "../model/controlUnit";

@Component({
    moduleId: module.id,
    selector: 'device-card',
    templateUrl: '../views/deviceCardView.html'
})
export class DeviceCardComponent implements AfterViewInit {
    @Input() device : Device;
    edit: boolean = false;
    val: string;

    ngAfterViewInit() {
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

    toggleEdit(event: Event) {
        console.log("Clicked toggle edit of device " + this.device.id + "(" + this.edit + ", " + this.val + ", " + JSON.stringify(this.device));
        event.stopPropagation();
        if(this.edit) {
            if(this.val === undefined || this.val === null || this.val === '') {
                return;
            } else {
                this.device.display_name = this.val;
                this.edit = false;
            }
        } else {
            this.val = this.device.display_name;
            this.edit = true;
        }
    }
}

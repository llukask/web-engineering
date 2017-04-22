import {Component, Input} from '@angular/core';
import {ControlUnit} from "../model/controlUnit";

@Component({
    moduleId: module.id,
    selector: 'boolean-control',
    templateUrl: '../views/booleanControl.html'
})
export class BooleanControlComponent {
    @Input() control: ControlUnit;
    
}

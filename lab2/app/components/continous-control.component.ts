import {Component, Input} from '@angular/core';
import {ControlUnit} from "../model/controlUnit";

@Component({
    moduleId: module.id,
    selector: 'continuous-control',
    templateUrl: '../views/continuousControl.html'
})
export class ContinuousControlComponent {
    @Input() control: ControlUnit;
}

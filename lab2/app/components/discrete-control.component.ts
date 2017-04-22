import {Component, Input} from '@angular/core';
import {ControlUnit} from "../model/controlUnit";

@Component({
    moduleId: module.id,
    selector: 'discrete-control',
    templateUrl: '../views/discreteControl.html'
})
export class DiscreteControlComponent {
    @Input() control: ControlUnit;
    val: number;
    msgs: string[];

    submit() {
        console.log(this.val);
    }
}

import {Component, Input} from '@angular/core';
import {ControlUnit} from "../model/controlUnit";
import { ChartsModule } from 'ng2-charts';

@Component({
    moduleId: module.id,
    selector: 'boolean-control',
    templateUrl: '../views/booleanControl.html'
})
export class BooleanControlComponent {
    @Input() control: ControlUnit;
    // Doughnut
  public doughnutChartLabels:string[] = ['Aus', 'Ein'];
  public doughnutChartData:number[] = [2, 3];
  public doughnutChartType:string = 'doughnut';
 
  // events
  public chartClicked(e:any):void {
    console.log(e);
  }
 
  public chartHovered(e:any):void {
    console.log(e);
  }
}

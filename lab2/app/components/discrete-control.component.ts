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

	  // PolarArea
	  public polarAreaChartLabels:string[] = ['Aus', 'Ein', 'Standbz'];
	  public polarAreaChartData:number[] = [3, 2, 3];
	  public polarAreaLegend:boolean = true;
	 
	  public polarAreaChartType:string = 'polarArea';
	 
	  // events
	  public chartClicked(e:any):void {
		console.log(e);
	  }
	 
	  public chartHovered(e:any):void {
		console.log(e);
	  }
    submit() {
        console.log(this.val);
    }
}

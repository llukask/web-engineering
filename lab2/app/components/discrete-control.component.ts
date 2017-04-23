import {Component, Input, OnInit} from '@angular/core';
import {ControlUnit} from "../model/controlUnit";

@Component({
    moduleId: module.id,
    selector: 'discrete-control',
    templateUrl: '../views/discreteControl.html'
})
export class DiscreteControlComponent implements OnInit {
    @Input() control: ControlUnit;
    val: number;
    msgs: string = "";

	  // PolarArea
	  public polarAreaChartLabels:string[] = ['Aus', 'Ein', 'Standby'];
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

	  ngOnInit() {
	  	this.polarAreaChartLabels = this.control.values;
		}

    submit() {
	  	console.log(this.control.current + " -> " + this.val);
        if(this.val === null || this.val === undefined || this.control.current == this.val) {
					return;
				}
				console.log("Submitted form with value " + this.control.values[this.val] + " (" + this.val + ")");
        this.polarAreaChartData[this.val] += 1;
        this.msgs += ((new Date()).toISOString() + ": " + this.control.values[this.control.current] + " -> "
					+ this.control.values[this.val]) + "\n";
				this.control.current = this.val;
				console.log(JSON.stringify(this.polarAreaChartData))
    }
}

import {Component, Input} from '@angular/core';
import {ControlUnit} from "../model/controlUnit";

@Component({
    moduleId: module.id,
    selector: 'continuous-control',
    templateUrl: '../views/continuousControl.html'
})
export class ContinuousControlComponent {
    @Input() control: ControlUnit;
    val: number;
    msgs: string = "";
	// lineChart
	  public lineChartData:Array<any> = [
		{data: [15, 12, 14, 16, 11, 20, 15, 12, 12.5, 12, 12.3, 12.4, 12, 15], label: 'Verlauf'}
	  ];
	  public lineChartLabels:Array<any> = ['6.3.2017 10:01:30', '6.3.2017 10:01:30', '6.3.2017 10:01:30', '6.3.2017 10:01:30', 
	  '6.3.2017 10:01:30', '6.3.2017 10:01:30', '6.3.2017 10:01:30', '6.3.2017 10:01:30', '6.3.2017 10:01:30', 
	  '6.3.2017 10:01:30', '6.3.2017 10:01:30', '6.3.2017 10:01:30', '6.3.2017 10:01:30', '6.3.2017 10:01:30',
	  '6.3.2017 10:01:30',  ];
	  public lineChartOptions:any = {
		responsive: true
	  };
	  public lineChartColors:Array<any> = [
		{ // grey
		  backgroundColor: 'rgba(148,159,177,0.2)',
		  borderColor: 'rgba(148,159,177,1)',
		  pointBackgroundColor: 'rgba(148,159,177,1)',
		  pointBorderColor: '#fff',
		  pointHoverBackgroundColor: '#fff',
		  pointHoverBorderColor: 'rgba(148,159,177,0.8)'
		},
		{ // dark grey
		  backgroundColor: 'rgba(77,83,96,0.2)',
		  borderColor: 'rgba(77,83,96,1)',
		  pointBackgroundColor: 'rgba(77,83,96,1)',
		  pointBorderColor: '#fff',
		  pointHoverBackgroundColor: '#fff',
		  pointHoverBorderColor: 'rgba(77,83,96,1)'
		},
		{ // grey
		  backgroundColor: 'rgba(148,159,177,0.2)',
		  borderColor: 'rgba(148,159,177,1)',
		  pointBackgroundColor: 'rgba(148,159,177,1)',
		  pointBorderColor: '#fff',
		  pointHoverBackgroundColor: '#fff',
		  pointHoverBorderColor: 'rgba(148,159,177,0.8)'
		}
	  ];
	  public lineChartLegend:boolean = true;
	  public lineChartType:string = 'line';
	 
	  // events
	  public chartClicked(e:any):void {
		console.log(e);
	  }
	 
	  public chartHovered(e:any):void {
		console.log(e);
	  }

	submit() {
		console.log(this.control.current + " -> " + this.val);
		if(this.val === null || this.val === undefined || this.control.current == this.val) {
			return;
		}
		console.log("Submitted form with value " + this.val);
		this.lineChartData.push(this.val);
		this.msgs += (new Date()).toISOString() + ": " + this.control.current + " -> " + this.val + "\n";
		this.control.current = this.val;
	}
}

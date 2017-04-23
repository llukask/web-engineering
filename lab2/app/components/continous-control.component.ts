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
		{data: [], label: 'Verlauf'}
	  ];
	  public lineChartLabels:Array<any> = [];
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

	// 6.3.2017 10:03:30: Aus -> An
	formatDate(d: Date): string {
		return d.getDate() + "." + (d.getMonth() + 1) + "." + d.getFullYear() + " " + (d.getHours() + 1) + ":"
			+ d.getMinutes() + d.getSeconds();
	}

	submit() {
		console.log(this.control.current + " -> " + this.val);
		if(this.val === null || this.val === undefined || this.control.current == this.val || this.val < this.control.min
			|| this.val > this.control.max) {
			return;
		}
		console.log("Submitted form with value " + this.val);
		let d: Date = new Date(Date.now());
		this.lineChartData[0].data.push(this.val);
		this.lineChartLabels.push(this.formatDate(d));
		//this.lineChartData[0].data = this.lineChartData[0].data.slice(Math.max(0, this.lineChartData[0].length - 14), this.lineChartData[0].length);
		this.lineChartData = this.lineChartData.slice();
		//this.lineChartLabels = this.lineChartLabels.slice(Math.max(0, this.lineChartLabels.length - 14), this.lineChartLabels.length);
		//console.log(JSON.stringify(this.lineChartData));
		this.msgs += this.formatDate(d) + ": " + this.control.current + " -> " + this.val + "\n";
		this.control.current = this.val;
	}
}

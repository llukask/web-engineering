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
	  public polarAreaChartData:number[] = [0,0,0];
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

	// 6.3.2017 10:03:30: Aus -> An
	formatDate(d: Date): string {
		return d.getDate() + "." + (d.getMonth() + 1) + "." + d.getFullYear() + " " + (d.getHours() + 1) + ":"
			+ d.getMinutes() + d.getSeconds();
	}

    submit() {
	  	console.log(this.control.current + " -> " + this.val);
        if(this.val === null || this.val === undefined || this.control.current == this.val) {
					return;
				}
				console.log("Submitted form with value " + this.control.values[this.val] + " (" + this.val + ")");
        this.polarAreaChartData[this.val] += 1;
        this.polarAreaChartData = this.polarAreaChartData.slice();
        this.msgs += this.formatDate(new Date()) + ": " + this.control.values[this.control.current] + " -> "
					+ this.control.values[this.val] + "\n";
				this.control.current = this.val;
				console.log(JSON.stringify(this.polarAreaChartData))
    }
}

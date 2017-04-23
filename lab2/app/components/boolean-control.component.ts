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
    val: boolean;
    msgs: string;
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

  formatBool(b: boolean): string {
    if(b) {
      return "Deaktiviert";
    } else {
      return "Aktiviert";
    }
  }

  makeBool(n: number): boolean {
    return n > 0;
  }

  makeNum(b: boolean): number {
    return b ? 1 : 0;
  }

  // 6.3.2017 10:03:30: Aus -> An
  formatDate(d: Date): string {
    return d.getDate() + "." + (d.getMonth() + 1) + "." + d.getFullYear() + " " + (d.getHours() + 1) + ":"
      + d.getMinutes() + d.getSeconds();
  }

  submit() {
    console.log(this.val);
    console.log(this.formatBool(this.makeBool(this.control.current)) + " -> " + this.formatBool(this.val));
    if(this.makeBool(this.control.current) === this.val) {
      return;
    }
    console.log("Submitted form with value " + this.formatBool(this.val) + " (" + this.val + ")");
    this.doughnutChartData[this.makeNum(this.val)] += 1;
    this.doughnutChartData = this.doughnutChartData.slice();
    this.msgs += this.formatDate(new Date()) + ": " +
      this.formatBool(this.makeBool(this.control.current)) + " -> "
    + this.formatBool(this.val) + "\n";
    this.control.current = this.makeNum(this.val);
    console.log(JSON.stringify(this.doughnutChartData))
  }
}

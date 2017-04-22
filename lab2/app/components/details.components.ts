import {Component, OnInit} from '@angular/core';
import {Device} from "../model/device";
import {DeviceService} from "../services/device.service";
import {ActivatedRoute} from "@angular/router";
import {ControlType} from "../model/controlType";

@Component({
  moduleId: module.id,
  selector: 'device-details',
  templateUrl: '../views/detailsView.html',

})
export class DetailsComponent implements OnInit {
  device: Promise<Device>;
  controlType = ControlType;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.device = this.route.snapshot.data['device'];
  }
}

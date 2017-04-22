import {Component, OnInit} from '@angular/core';
import {Device} from "../model/device";
import {DeviceService} from "../services/device.service";

@Component({
  moduleId: module.id,
  selector: 'my-app',
  templateUrl: '../views/detailsView.html'
})
export class DetailsComponent {
  device: Promise<Device>;

}

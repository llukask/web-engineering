import { NgModule }       from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';
import { FormsModule }    from '@angular/forms';
import { ChartsModule } from 'ng2-charts';

import { AppComponent }         from './components/app.component';
import { OverviewComponent } from './components/overview.component';
import { LoginComponent } from './components/login.component';
import { OptionsComponent } from './components/options.component';
import { ServerStatsComponent } from './components/serverstats.component';
import {AppRoutes} from './app-routes';
import {DetailsComponent} from "./components/details.components";
import {ContinuousControlComponent} from "./components/continous-control.component";
import {DiscreteControlComponent} from "./components/discrete-control.component";
import {BooleanControlComponent} from "./components/boolean-control.component";
import {DeviceService} from "./services/device.service";
import {DeviceCardComponent} from "./components/device-card.component";
import {DeviceResolver} from "./services/device-resolver.service";
import {RouterModule} from "@angular/router";
import {FormatBoolPipe} from "./format-bool.pipe";
import {Num2BoolPipe} from "./num2bool.pipe";

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    ChartsModule,
    RouterModule.forRoot(AppRoutes),
  ],
  declarations: [
    AppComponent,
    OverviewComponent,
    LoginComponent,
    OptionsComponent,
    ServerStatsComponent,
    DetailsComponent,
    ContinuousControlComponent,
    DiscreteControlComponent,
    BooleanControlComponent,
    DeviceCardComponent,
    FormatBoolPipe,
    Num2BoolPipe,
  ],
  providers: [
    DeviceService,
    DeviceResolver
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }

import { NgModule }       from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';
import { FormsModule }    from '@angular/forms';
import { ChartsModule } from 'ng2-charts';

import { AppComponent }         from './components/app.component';
import { OverviewComponent } from './components/overview.component';
import { LoginComponent } from './components/login.component';
import { OptionsComponent } from './components/options.component';
import { ServerStatsComponent } from './components/serverstats.component';
import { AppRoutesModule } from './app-routes.module';
import {DetailsComponent} from "./components/details.components";

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    ChartsModule,
    AppRoutesModule,
  ],
  declarations: [
    AppComponent,
    OverviewComponent,
    LoginComponent,
    OptionsComponent,
    ServerStatsComponent,
    DetailsComponent,
  ],
  providers: [
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }

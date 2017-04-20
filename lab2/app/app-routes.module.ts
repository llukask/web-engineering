import { RouterModule, Routes } from '@angular/router';
import { OverviewComponent } from './components/overview.component';
import { LoginComponent } from './components/login.component';
import { OptionsComponent } from './components/options.component';
import {DetailsComponent} from "./components/details.components";

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full'},
  { path: 'overview', component: OverviewComponent },
  { path: 'login', component: LoginComponent },
  { path: 'options', component: OptionsComponent },
  { path: 'overview/details', component: DetailsComponent },
];

export const AppRoutesModule = RouterModule.forRoot(routes);
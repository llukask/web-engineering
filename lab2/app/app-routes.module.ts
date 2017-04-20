import { RouterModule, Routes } from '@angular/router';
import { OverviewComponent } from './components/overview.component';
import { LoginComponent } from './components/login.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full'},
  { path: 'overview', component: OverviewComponent },
  { path: 'login', component: LoginComponent }
];

export const AppRoutesModule = RouterModule.forRoot(routes);
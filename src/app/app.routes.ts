import { Routes } from '@angular/router';
import {LoginComponent} from "./login/login.component";
import {EmployeeListComponent} from "./employee-list/employee-list.component";
import {AddEmployeeComponent} from "./add-employee/add-employee.component";
import {EmployeeDetailComponent} from "./employee-detail/employee-detail.component";
import {AuthGuardService} from "./guard/auth-guard.service";

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'employee-list', component: EmployeeListComponent, canActivate: [AuthGuardService] },
  { path: 'add-employee', component: AddEmployeeComponent, canActivate: [AuthGuardService] },
  { path: 'add-employee/:username', component: AddEmployeeComponent, canActivate: [AuthGuardService] },
  { path: 'employee-detail/:username', component: EmployeeDetailComponent, canActivate: [AuthGuardService] },
  { path: '**', redirectTo: '/login' }
];

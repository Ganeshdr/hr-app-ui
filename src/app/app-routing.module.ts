import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './pms/employee_details/dashboard.component';
import { AddComponent } from './pms/add_employee/add.component';
import { EditEmployeeComponent } from './pms/edit_employee/edit.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
	{ path: '', redirectTo: '/dashboard', pathMatch: 'full' },
	{ path: 'login', component: LoginComponent},
	{ path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard]},
	{path:"add", component:AddComponent, canActivate: [AuthGuard]},
	{ path: 'edit/:id', component: EditEmployeeComponent, 
		canActivate: [AuthGuard], data: { role: ['admin']}}
];

@NgModule({
	imports: [ RouterModule.forRoot(routes) ],
	exports: [ RouterModule ]
})

export class AppRoutingModule {}
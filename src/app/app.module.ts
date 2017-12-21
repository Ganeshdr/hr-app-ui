import './rxjs-extensions';

import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }	 from '@angular/forms';
import { HttpModule }    from '@angular/http';

import { AppComponent }  from './app.component';
import { EditEmployeeComponent } from './pms/edit_employee/edit.component';
import { AddComponent } from './pms/add_employee/add.component';
import { DashboardComponent } from './pms/employee_details/dashboard.component';
import { EmployeeSearchComponent } from './pms/search_employee/employee-search.component';
import { LoginComponent } from './login/login.component';
import { NavbarComponent } from './pms/navbar/navbar.component';
import { EmployeeService } from './employee.service';
import { AuthenticationService } from './authentication.service'
import { AuthGuard } from './auth.guard'

import { AppRoutingModule } from './app-routing.module'

@NgModule({
  imports: [ 
  		BrowserModule,
  		FormsModule,
      HttpModule,
  		AppRoutingModule
  ],
  declarations: [ 
  		AppComponent, 
  		EditEmployeeComponent, 
  		DashboardComponent,
      EmployeeSearchComponent,
      LoginComponent,
      AddComponent,
      NavbarComponent
  ],
  bootstrap:    [ AppComponent ],
  providers: [ EmployeeService, AuthenticationService, AuthGuard]
})

export class AppModule { }

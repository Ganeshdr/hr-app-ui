import { Component, OnInit } from '@angular/core'
import { CanActivate } from '@angular/router';
import { EmployeeService } from './employee.service';
import { AuthenticationService } from './authentication.service'

@Component({
	selector: 'app-root',
  template: `
      <ng-container *ngIf="authentication.isLoggedIn">
        <app-navbar></app-navbar>
      </ng-container>
      <div class="container">
        <router-outlet></router-outlet>
      </div>
	`,
  styleUrls: [ './assets/app.component.css' ]
})

export class AppComponent implements OnInit {
  constructor(
    public authentication: AuthenticationService,
    private employeeService: EmployeeService,
  ){}

  ngOnInit() {
    this.authentication.isLoggedIn = false
  }
}
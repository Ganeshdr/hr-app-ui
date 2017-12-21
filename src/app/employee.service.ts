import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import { AuthenticationService } from './authentication.service';

import 'rxjs/add/operator/toPromise';

import { Employee } from './employee'

@Injectable()
export class EmployeeService {
	private employeesUrl = 'api/employees'; // URL to web api

	constructor(
		public authService: AuthenticationService,
		private http: Http) {}
		
	getEmployees(): Promise<Employee[]> {
		// return Promise.resolve(Employees);
		return this.http.get(this.employeesUrl, {headers: this.jwt()})
				   .toPromise()
				   .then(response => response.json().data as Employee[])
				   .catch((err)=>this.handleError(err));
	}

	getEmployee(id: number): Promise<Employee> {
		const url = `${this.employeesUrl}/${id}`;
		return this.http.get(url, {headers: this.jwt()})
				   .toPromise()
				   .then(response => response.json().data as Employee)
				   .catch((err)=>this.handleError(err));
	}

	update(employee: Employee): Promise<Employee> {
		const url = `${this.employeesUrl}/${employee.id}`;
		return this.http
				   .put(url, employee, {headers: this.jwt()})
				   .toPromise()
				   .then(() => employee)
				   .catch((err)=>this.handleError(err));
	}

	create(employee: Employee): Promise<Employee> {
		return this.http
				.post(this.employeesUrl, employee, {headers: this.jwt()})
				.toPromise()
				.then(res => res.json().data)
				.catch((err)=>this.handleError(err));
	}

	delete(id: number): Promise<void> {
		const url = `${this.employeesUrl}/${id}`;
		return this.http.delete(url, {headers: this.jwt()})
				.toPromise()
				.then(() => null)
				.catch((err)=>this.handleError(err));
	}

	private jwt() {
		let currentUser = JSON.parse(localStorage.getItem('currentUser'));
		if (currentUser && currentUser.token){
			return new Headers(
				{'Authorization': 'Bearer ' + currentUser.token,
				'Content-Type': 'application/json'});
		}
	}

	handleError(error: any) {
   	console.error('An error occurred', error);
	if (error.status == 401)
	{
		alert(error.json()['message'])
		let currentUser = JSON.parse(localStorage.getItem('currentUser'));
		if(currentUser)
		{
			localStorage.removeItem('currentUser');
            this.authService.isLoggedIn = false;
		}
        this.authService.router.navigate(['/login']);
	}
	else
		return Promise.reject(error.message || error);
  }
}
import { Component, OnInit } from '@angular/core';
import { SlicePipe } from '@angular/common';

import { Employee } from '../../employee';
import { EmployeeService } from '../../employee.service';

@Component({
	selector: 'my-dashboard',
	templateUrl: './dashboard.component.html',
	styleUrls: [ './dashboard.component.css' ]
})

export class DashboardComponent implements OnInit{
	employees: Employee[] = [];
	currentPage:number = 1;
	pageSize:number = 5;
	pageArray:Array<number> = [];
	totalItems:number;
	noOfPages:number;

	constructor(private employeeService: EmployeeService) {}

	ngOnInit(): void {
		this.employeeService.getEmployees()
			.then(employees => {
				this.employees = employees;
				this.displayPagination(this.employees);
		});
	};

	displayPagination(items): any {
		this.totalItems = items.length; // number of items received.
		this.noOfPages = Math.ceil(this.totalItems / this.pageSize);
		for (var i=1; i<=this.noOfPages; i++) {
			//Check if page number is already appended in the variable mentained for apagination.
			//This check is to avoid duplicate page numbers being added upon multiple clicks on a tab.
			if(this.pageArray.indexOf(i) == -1){
				this.pageArray.push(i);
			}
		};
	}

	getCurrentPage(val, opern): void {
		if(opern == 'sub'){
			this.currentPage =  val - 1
		} else {
			this.currentPage = val + 1
		}
	}
}
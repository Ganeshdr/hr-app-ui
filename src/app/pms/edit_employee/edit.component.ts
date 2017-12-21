import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';

import 'rxjs/add/operator/switchMap';

import { Employee } from '../../employee'
import { EmployeeService } from '../../employee.service';

@Component({
	selector: 'edit-employee',
	templateUrl: './edit.component.html',
	styleUrls: [ './edit.component.css' ]
})


export class EditEmployeeComponent implements OnInit{
	employee: Employee;
	selectVarFreq = ['Monthly', 'Quarterly', 'Half Yearly', 'Yearly'];
	constructor(
	  private employeeService: EmployeeService,
	  private route: ActivatedRoute,
	  private location: Location
	) {}

	ngOnInit(): void {
		this.route.params
			.switchMap((params: Params) => this.employeeService.getEmployee(+params['id']))
			.subscribe(employee => {
				this.employee = employee;
				if(!this.employee.var_ctc){
					this.employee.var_ctc_frequency = null;
				} else {
					this.employee.var_ctc_frequency = this.selectVarFreq[0];
				}
			});
	}

	goBack(): void {
		this.location.back();
	}

	save(): void {
		this.employeeService.update(this.employee)
			.then(() => this.goBack());
	}
}
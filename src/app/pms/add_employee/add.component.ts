import { Component, OnInit } from '@angular/core';
import { Employee } from '../../employee';
import { EmployeeService } from '../../employee.service'
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {
  employee = new Employee();
  selectVarFreq = ['Monthly', 'Quarterly', 'Half Yearly', 'Yearly'];
  constructor(
    private employeeService: EmployeeService,
    private router: Router,
    private location: Location) { }

  ngOnInit() {
    this.employee.var_ctc_frequency = this.selectVarFreq[0];
  }

  add(empDetails:any): void{
    this.employeeService.create(empDetails)
      .then(employee => {
        this.goBack();
      });
  }

  goBack(): void {
    this.location.back();
  }
}

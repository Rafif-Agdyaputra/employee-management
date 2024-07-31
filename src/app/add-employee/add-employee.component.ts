import {Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {ActivatedRoute, Router} from '@angular/router';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from "@angular/common/http";
import { EmployeeService } from '../employee.service';
import {Employee} from "../../shared/dto/employee.dto";

@Component({
  selector: 'app-add-employee',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  providers: [EmployeeService],
  templateUrl: './add-employee.component.html',
})
export class AddEmployeeComponent implements OnInit{
  employee: Employee = {
    username: '',
    firstName: '',
    lastName: '',
    email: '',
    birthDate: '',
    basicSalary: NaN,
    status: '',
    group: '',
    description: ''
  };
  groups = [
    'Group A', 'Group B', 'Group C', 'Group D', 'Group E',
    'Group F', 'Group G', 'Group H', 'Group I', 'Group J'
  ];
  today: string;
  usernameExists: boolean = false;
  isEditMode = false;
  constructor(
    private employeeService: EmployeeService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    const now = new Date();
    this.today = now.toISOString().split('T')[0];
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      const username = params['username'];
      if (username) {
        this.isEditMode = true;
        this.employeeService.getEmployeeByUsername(username).subscribe(data => {
          this.employee = data;
          this.employee.birthDate = new Date(this.employee.birthDate).toISOString().split('T')[0];
          console.log(this.employee)
        });
      }
    });
  }

  checkUsername() {
    this.employeeService.usernameExists(this.employee.username).subscribe(exists => {
      this.usernameExists = exists;
    });
  }

  addEmployee() {
    if (this.isValidEmployee(this.employee)) {
      if (this.isEditMode) {
        this.employeeService.updateEmployee(this.employee).subscribe(() => {
          this.router.navigate(['/employee-list']);
        });
      } else {
        this.employeeService.addEmployee(this.employee).subscribe(() => {
          this.router.navigate(['/employee-list']);
        });
      }
    }
  }

  cancel() {
    this.router.navigate(['/employee-list']);
  }

  isValidEmployee(employee: Employee): boolean {
    if (!employee.username || !employee.firstName || !employee.lastName || !employee.email ||
      !employee.birthDate || !employee.basicSalary || !employee.status || !employee.group || !employee.description) {
      return false;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(employee.email)) {
      return false;
    }

    if (isNaN(employee.basicSalary)) {
      return false;
    }

    const today = new Date().toISOString().split('T')[0];
    if (employee.birthDate > today) {
      return false;
    }

    return true;
  }
}

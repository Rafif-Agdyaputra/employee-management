import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from '../employee.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-employee-detail',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './employee-detail.component.html',
  styleUrls: ['./employee-detail.component.scss']
})
export class EmployeeDetailComponent implements OnInit {
  employee: any;
  searchText: string = '';

  constructor(private route: ActivatedRoute, private employeeService: EmployeeService, private router: Router) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const username = params['username'];
      this.employeeService.getEmployeeByUsername(username).subscribe(data => {
        this.employee = data;
      });
    });

    this.searchText = localStorage.getItem('employeeSearchText') || '';
  }

  formatSalary(salary: number): string {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(salary);
  }

  goBack(): void {
    this.router.navigate(['/employee-list']);
  }
}

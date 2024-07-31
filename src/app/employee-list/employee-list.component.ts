import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';
import { EmployeeService } from '../employee.service';
import { isPlatformBrowser} from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import {PipesModule} from "../../shared/pipes/pipes.module";
import {ActionModalComponent} from "../action-modal/action-modal.component";

@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports: [CommonModule, FormsModule, PipesModule, ActionModalComponent],
  templateUrl: './employee-list.component.html',
})
export class EmployeeListComponent implements OnInit {
  employees: any[] = [];
  searchText: string = '';
  pagedEmployees: any[] = [];
  currentPage: number = 1;
  pageSize: number = 10;
  totalPages: number = 0;
  private readonly platformId: Object;
  selectedUsername: string = '';
  showModal: boolean = false;

  constructor(@Inject(PLATFORM_ID) private platform: Object, private router: Router, private employeeService: EmployeeService) {
    this.platformId = platform;
  }

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.searchText = localStorage.getItem('employeeSearchText') || '';
    }
    this.fetchEmployees();
  }

  fetchEmployees(): void {
    this.employeeService.getEmployees().subscribe(data => {
      this.employees = data;
      this.totalPages = Math.ceil(this.employees.length / this.pageSize);
      this.updatePagedEmployees();
    });
  }

  updatePagedEmployees(): void {
    const start = (this.currentPage - 1) * this.pageSize;
    const end = start + this.pageSize;
    this.pagedEmployees = this.employees
      .filter(employee =>
        employee.firstName.toLowerCase().includes(this.searchText.toLowerCase()) ||
        employee.lastName.toLowerCase().includes(this.searchText.toLowerCase()) ||
        employee.username.toLowerCase().includes(this.searchText.toLowerCase())
      )
      .slice(start, end);
  }

  changePage(page: number): void {
    if (page > 0 && page <= this.totalPages) {
      this.currentPage = page;
      this.updatePagedEmployees();
    }
  }

  addEmployee(): void {
    this.router.navigate(['/add-employee']);
  }

  viewEmployeeDetails(username: string): void {
    this.router.navigate(['/employee-detail', username]);
  }

  deleteEmployee(username: string): void {
    if (confirm('Are you sure you want to delete this employee?')) {
      this.employeeService.deleteEmployee(username).subscribe(() => {
        this.fetchEmployees();
      });
    }
  }

  search(): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('employeeSearchText', this.searchText); // Save search text
    }
    this.currentPage = 1;
    this.updatePagedEmployees();
  }

  openModal(username: string): void {
    this.selectedUsername = username;
    this.showModal = true;
  }

  closeModal(): void {
    this.showModal = false;
  }

  handleModalDelete(): void {
    this.deleteEmployee(this.selectedUsername);
    this.closeModal();
  }

  handleModalView(): void {
    this.viewEmployeeDetails(this.selectedUsername);
    this.closeModal();
  }

  handleModalEdit(): void {
    this.router.navigate(['/add-employee', this.selectedUsername]);
    this.closeModal();
  }
}

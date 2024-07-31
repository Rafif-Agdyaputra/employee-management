import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {map, mergeMap, Observable} from 'rxjs';
import {Employee} from "../shared/dto/employee.dto";

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private apiUrl = 'http://localhost:3000/employees';

  constructor(private http: HttpClient) {}

  getEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>(this.apiUrl);
  }

  getEmployeeByUsername(username: string): Observable<any> {
    return this.http.get<Employee[]>(this.apiUrl).pipe(
      map(employees => employees.find(emp => emp.username === username))
    );
  }

  usernameExists(username: string): Observable<boolean> {
    return this.getEmployees().pipe(
      map(employees => employees.some(emp => emp.username === username))
    );
  }

  addEmployee(employee: Employee): Observable<any> {
    return this.http.post<Employee>(this.apiUrl, employee);
  }

  updateEmployee(employee: Employee): Observable<any> {
    return this.http.put<Employee>(`${this.apiUrl}/${employee.id}`, employee);
  }

  deleteEmployee(username: string): Observable<any> {
    return this.http.get<Employee[]>(this.apiUrl).pipe(
      mergeMap((employees: Employee[]) => {
        const employee = employees.find(e => e.username === username);
        if (employee) {
          return this.http.delete(`${this.apiUrl}/${employee.id}`);
        }
        return new Observable(observer => {
          observer.error('Karyawan tidak ditemukan');
        });
      })
    );
  }
}

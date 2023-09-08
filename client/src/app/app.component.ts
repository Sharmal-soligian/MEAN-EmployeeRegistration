import { Component, OnInit } from '@angular/core';
import { EmployeeService } from './service/employee.service';
import { Employee } from './model/employee';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  employees: Employee[] = [];

  constructor(
    private employeeService: EmployeeService
  ) {

  }
  ngOnInit(): void {
    this.getEmp();
  }

  getEmp() {
    this.employeeService.getEmployees().subscribe(
      (res: any) => {
        console.log('res', res.data);
        this.employees = res.data;
      },
      (err: HttpErrorResponse) => {
        console.error('Error getting employees', err.message);
      }
    )
  }

  openModal(employee: Employee, mode: string) {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if(mode === 'add') {
      button.setAttribute('data-target', '#addEmployeeModal');
    }
    if(mode === 'edit') {
      button.setAttribute('data-target', '#updateEmployeeModal');
    }
    if(mode === 'delete') {
      button.setAttribute('data-target', '#deleteEmployeeModal');
    }
    container?.appendChild(button);
    button.click();
  }
}

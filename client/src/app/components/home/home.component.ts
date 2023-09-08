import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Employee } from 'src/app/model/employee';
import { EmployeeService } from 'src/app/service/employee.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

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

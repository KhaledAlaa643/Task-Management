import { Component, OnInit } from '@angular/core';
import { Employee } from 'src/app/Model/employee';
import { EmployeeService } from 'src/app/Services/employee.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-main-employee',
  templateUrl: './main-employee.component.html',
  styleUrls: ['./main-employee.component.css']
})
export class MainEmployeeComponent implements OnInit {
  employees: Employee[] = [];
  constructor(private employeeService: EmployeeService)
  { }
ngOnInit(): void {
    this.loadEmployees();
  }
loadEmployees() {
    this.employeeService.getEmployees().subscribe(
      (data) => {
        this.employees = data;
        this.calculateNetSalaries();
      }
    );
  }
calculateNetSalaries() {
    for (const employee of this.employees) {
      employee.netSalary = employee.grossSalary -  (0.14 * employee.grossSalary);
    }
  }
  remove(employee: Employee) {
    const confirmation = window.confirm('Are you sure you want to delete this employee?');
    if (confirmation) {
      this.employeeService.deleteEmployee(employee.id).subscribe(
        () => {
          this.employees = this.employees.filter((emp) => emp.id !== employee.id);
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'The Admin has been deleted Successfully',
            showConfirmButton: false,
            timer: 1500,
          });
        })
    }
  }
}

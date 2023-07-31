import { Component } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { Employee } from 'src/app/Model/employee';
import { EmployeeService } from 'src/app/Services/employee.service';
import { Location } from '@angular/common'
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-employee',
  templateUrl: './edit-employee.component.html',
  styleUrls: ['./edit-employee.component.css']
})
export class EditEmployeeComponent {
  employees: Employee = {} as Employee
  backupEmployee: Employee = {} as Employee;
  id!: any
  constructor(
    private router: Router,
    private location: Location,
    private employeeService: EmployeeService,
    private ActivatedRoute: ActivatedRoute) {
    this.ActivatedRoute.params.subscribe((param) => {
      this.id = +param['id'];
      this.getEmployeeDetails();
    })
}


  getEmployeeDetails() {
    this.employeeService.getEmployeeByID(this.id).subscribe(
      (employee: Employee) => {
        this.employees = employee;
      })
  }
updateEmployee() {
  this.employeeService.updateEmployee(this.id, this.employees).subscribe(
      (updatedEmployee: Employee) => {
        this.employees = updatedEmployee;
        // Show a success message using SweetAlert2
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Updated Successfully',
          showConfirmButton: false,
          timer: 1500,
        }).then(() => {
          // Redirect to the employee list page after successful update
          this.router.navigate(['/crud']);
        });
      },
 )
}
}

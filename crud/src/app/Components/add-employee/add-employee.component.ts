import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Employee } from 'src/app/Model/employee';
import { EmployeeService } from 'src/app/Services/employee.service';
import Swal from 'sweetalert2';
import { Location } from '@angular/common'

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css']
})
export class AddEmployeeComponent {
employee:Employee = {} as Employee
  constructor(
    private router: Router,
    private location: Location,
    private employeeService: EmployeeService) { }
   saveEmployee(){
    this.employeeService.saveEmployee(this.employee).subscribe({
      next: (data) => {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Added Successfully',
          showConfirmButton: false,
          timer: 1500,
        }).then(()=>{
          this.router.navigate(['/crud'])
        });
      },
      error: (err) => {
        Swal.fire({
          icon: 'error',
          title: 'Employee Alredy Existed',
        })
      }
    })
  }
    goBack(){
    this.location.back()
  }
}

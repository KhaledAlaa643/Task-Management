import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Employee } from 'src/app/Model/employee';
import { EmployeeService } from 'src/app/Services/employee.service';
import Swal from 'sweetalert2';
import { Location } from '@angular/common'
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css']
})
export class AddEmployeeComponent {
  employee: Employee = {} as Employee
  employeeForm!: FormGroup;

  constructor(
    private router: Router,
    private location: Location,
    private employeeService: EmployeeService,
    private fb: FormBuilder) { }

  ngOnInit() {
    this.employeeForm = this.fb.group({
      name: ['', [Validators.required, Validators.pattern('^[A-Za-z\\s]{3,100}$')]],
      age: ['', [Validators.required, Validators.pattern('^(1[8-9]|[2-9][0-9]|100)$')]],
      grossSalary: ['', [Validators.required]]
    });
  }

  saveEmployee() {
    if (this.employeeForm.valid) {
      this.employee.name = this.employeeForm.get('name')?.value;
      this.employee.age = this.employeeForm.get('age')?.value;
      this.employee.grossSalary = this.employeeForm.get('grossSalary')?.value;

      this.employeeService.saveEmployee(this.employee).subscribe({
        next: (data) => {
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Added Successfully',
            showConfirmButton: false,
            timer: 1500,
          }).then(() => {
            this.router.navigate(['/crud']);
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
  }
}

import { Component } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { Employee } from 'src/app/Model/employee';
import { EmployeeService } from 'src/app/Services/employee.service';
import { Location } from '@angular/common'
import Swal from 'sweetalert2';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-employee',
  templateUrl: './edit-employee.component.html',
  styleUrls: ['./edit-employee.component.css']
})
export class EditEmployeeComponent {
  employees: Employee = {} as Employee
  backupEmployee: Employee = {} as Employee;
  id!: any
  employeeForm!: FormGroup;
  constructor(
    private router: Router,
    private employeeService: EmployeeService,
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute
  ) {
    this.activatedRoute.params.subscribe((param) => {
      this.id = +param['id'];
      this.getEmployeeDetails();
    });
  }

  ngOnInit() {
    this.employeeForm = this.fb.group({
      name: ['', [Validators.required, Validators.pattern('^[A-Za-z\\s]{3,100}$')]],
      age: ['', [Validators.required, Validators.pattern('^(1[8-9]|[2-9][0-9]|100)$')]],
      grossSalary: ['', [Validators.required]]
    });
  }

  getEmployeeDetails() {
    this.employeeService.getEmployeeByID(this.id).subscribe(
      (employee: Employee) => {
        this.employees = employee;
        this.employeeForm.patchValue({
          name: employee.name,
          age: employee.age,
          grossSalary: employee.grossSalary
        });
      }
    );
  }

  updateEmployee() {
    if (this.employeeForm.valid) {
      this.employees.name = this.employeeForm.get('name')?.value;
      this.employees.age = this.employeeForm.get('age')?.value;
      this.employees.grossSalary = this.employeeForm.get('grossSalary')?.value;

      this.employeeService.updateEmployee(this.id, this.employees).subscribe(
        (updatedEmployee: Employee) => {
          this.employees = updatedEmployee;
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Updated Successfully',
            showConfirmButton: false,
            timer: 1500,
          }).then(() => {
            this.router.navigate(['/crud']);
          });
        }
      );
    }
  }
}

import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class FormService {
  addTaskFormValidation!: FormGroup;
  editFormTask!: FormGroup;
  constructor(private fb: FormBuilder) { 
    this.addTaskFormValidation = this.fb.group({
        name: ['', [Validators.required, Validators.minLength(3)]],
        description: [''],
        status: ["Review", Validators.required],
        priority: ['', Validators.required],
        tag: ['',Validators.required],
        project: ['',Validators.required],
        category: ['',Validators.required],
        date: ['',Validators.required],
    });
  this.editFormTask = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    description: ['',Validators.required],
    status: ['', Validators.required],
    priority: ['', Validators.required],
    tag: ['',Validators.required],
    project: ['',Validators.required],
    category: ['',Validators.required],
    date: ['',Validators.required],
  });
  }
}

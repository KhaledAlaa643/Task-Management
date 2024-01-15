import {  Component, OnInit, ViewChild } from '@angular/core';
import { taskService } from 'src/app/Service/task.service';
import Swal from 'sweetalert2';
import * as moment from 'moment';
import { Task } from 'src/app/Model/Tasks';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormService } from 'src/app/Service/form.service';


@Component({
  selector: 'app-crud',
  templateUrl: './crud.component.html',
  styleUrls: ['./crud.component.css']
})
export class CrudComponent implements OnInit {
  tasks: Task[] = [];
  filteredTasks: Task[] = [];
  @ViewChild('AddTaskForm') addTaskForm: any;
  @ViewChild ('checkbox') checkbox!:string
  selectedTaskId!: number;
  selectedFilter: string = ''; 
  searchText: string = '';
  selectedDate!: Date | any;
  checked: boolean = false;
  selectedSortOption: string = '1';
  originalStatus!: string
  addTaskFormValidation!: FormGroup;
  editFormTask!: FormGroup;
constructor(private taskService: taskService , private formService:FormService) { 
  this.addTaskFormValidation = this.formService.addTaskFormValidation
  this.editFormTask = this.formService.editFormTask

}
  ngOnInit() {
    this.loadTasks();    
  }
loadTasks() {
  this.taskService.getTasks().subscribe(
    (data) => {
      this.filteredTasks = data;
    });
}
remove(task: Task) {
  Swal.fire({
  title: "Are you sure?",
  text: "You won't be able to revert this!",
  icon: "warning",
  showCancelButton: true,
  confirmButtonColor: "#056cbb",
  cancelButtonColor: "#d33",
  confirmButtonText: "Yes, delete it!"
}).then((result) => {
  if (result.isConfirmed) {
    this.taskService.deleteTask(task.id).subscribe(() => {
    this.filteredTasks = this.filteredTasks.filter((tsk) => tsk.id !== task.id);
    this.closeForm();
    })

    Swal.fire({
      title: "Deleted!",
      text: "Your Todo  Task has been deleted.",
      icon: "success"
    });
  }
});
}
saveTask() {
  this.taskService.saveTask(this.formService.addTaskFormValidation.value).subscribe({
    next: (data) => {
      this.filteredTasks.push(data);
      this.closeForm()
      this.formService.addTaskFormValidation.controls['status'].patchValue('Review')
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Task Saved Successfully',
        showConfirmButton: false,
        timer: 1500,
      });
    },
  });
}
onRowClick(event: Event, taskId: number) {
  const text = event.target as Element;
  const tagText = text.tagName.toLowerCase();
  if (!(event.target instanceof HTMLInputElement && event.target.type === 'checkbox' || tagText === 'i' || tagText === 'span')) {
    this.getTaskDetails(taskId);
    this.selectedTaskId = taskId;
  } else {
    event.stopPropagation();
  }
}

onCheckboxChange(event: MatCheckboxChange, task: Task) {
  if (event.checked) {
    this.originalStatus = task.status;
  }
  if (event.checked) {
    task.status = 'Completed';
  } else {
    task.status = this.originalStatus;
  }
}
getTaskDetails(taskId: number) {
  this.taskService.getTaskByID(taskId).subscribe(
    (task: Task) => {
      this.editFormTask.patchValue(task);
  });
}

updateTask(taskId: number) {
  this.taskService.updateTask(taskId, this.editFormTask.value).subscribe(
    (updatedTask: Task) => {
      const index = this.filteredTasks.findIndex(e => e.id === updatedTask.id);
      this.closeForm();
      if (index !== -1) {
        this.filteredTasks[index] = updatedTask;
      this.closeForm();
      }
      this.editFormTask.patchValue(updatedTask);
      this.closeForm();
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Updated Successfully',
        showConfirmButton: false,
        confirmButtonColor: "#056cbb",
        timer: 1500,
      })
    });
}
closeForm() {
  this.addTaskFormValidation.reset();
}
filterTasks() {
    this.selectedDate = this.searchText ? moment(this.searchText, 'YYYY-MM-DD').toDate() : null;
    switch (this.selectedFilter) {
      case 'All': 
        this.filteredTasks = [...this.tasks];
        break;
      case 'Priority': 
        this.filterByPriority();
        break;
      case 'Category': 
        this.filterByCategory();
        break;
      case 'Due date': 
        this.filterByDueDate();
        break;
    }
  }
filterByPriority() {
    if (!this.searchText) {
      this.filteredTasks = [...this.tasks];
    } else {
      const searchLowerCase = this.searchText.toLowerCase();
      this.filteredTasks = this.tasks.filter(Task =>
        Task.priority.toLowerCase().startsWith(searchLowerCase)
      );
    }
  }
filterByCategory() {
    if (!this.searchText) {
      this.filteredTasks = [...this.tasks];
    } else {
      const searchLowerCase = this.searchText.toLowerCase();
      this.filteredTasks = this.tasks.filter(Task =>
        Task.category.toLowerCase().startsWith(searchLowerCase)
      );
    }
  }
filterByDueDate() {
  if (!this.selectedDate) {
    this.filteredTasks = [...this.tasks];
  } else {
    const searchDate = this.searchText;
    this.filteredTasks = this.filteredTasks.filter(Task => {
      const TaskDate = Task.date;
      return TaskDate.includes(searchDate);
    });
  }
}

sortTasks() {
  if (this.selectedSortOption === '1') {
    this.filteredTasks.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  } else if (this.selectedSortOption === '2') {
    this.filteredTasks.sort((a, b) => a.priority.localeCompare(b.priority));
  }
  }
}

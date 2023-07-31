import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainEmployeeComponent } from './Components/main-employee/main-employee.component';
import { AddEmployeeComponent } from './Components/add-employee/add-employee.component';
import { EditEmployeeComponent } from './Components/edit-employee/edit-employee.component';

const routes: Routes = [
    { path: 'crud', component: MainEmployeeComponent },
    { path: '', component: MainEmployeeComponent },
    { path: 'crud/add', component: AddEmployeeComponent },
    { path: 'crud/edit/:id', component: EditEmployeeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AddEmployeeComponent } from './Components/add-employee/add-employee.component';
import { MainEmployeeComponent } from './Components/main-employee/main-employee.component';
import { EditEmployeeComponent } from './Components/edit-employee/edit-employee.component';

@NgModule({
  declarations: [
    AppComponent,
    AddEmployeeComponent,
    MainEmployeeComponent,
    EditEmployeeComponent
  ],
  imports: [
    BrowserModule,
    RouterModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [Location],
  bootstrap: [AppComponent]
})
export class AppModule { }

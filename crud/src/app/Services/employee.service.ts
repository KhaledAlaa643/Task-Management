import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Employee } from '../Model/employee';
import { Observable } from 'rxjs';
import { environment } from '../environment/environment.development';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
employee:Employee[]=[]
  constructor(private _httpClient: HttpClient) { }
    getEmployees():Observable<Employee[]>{
    return this._httpClient.get<Employee[]>(`${environment.apiURL}employee`)
  }
  deleteEmployee(employeeId:number):Observable<void>{
    return this._httpClient.delete<void>(`http://localhost:3000/employee/${employeeId}`);
  }
  getEmployeeByID(id: number): Observable<Employee> {
    return this._httpClient.get<Employee>(`${environment.apiURL}employee/${id}`);
  }
  getEmployeesIDs () {
    return this.employee.map(e=>e.id)
  }
  updateEmployee(employeeId: number, employeeData: Employee): Observable<Employee> {
    return this._httpClient.patch<Employee>(`${environment.apiURL}employee/${employeeId}`,employeeData,)
  }
  saveEmployee(Employee:Employee){
    return this._httpClient.post<Employee>(`${environment.apiURL}employee/`,Employee)
  }
}

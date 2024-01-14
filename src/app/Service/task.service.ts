import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/envrionments/environment.development';
import { Task } from '../Model/Tasks';

@Injectable({
  providedIn: 'root'
})
export class taskService {
tasks:Task[]=[]
constructor(private _httpClient:HttpClient) {}
getTasks():Observable<Task[]>{
    return this._httpClient.get<Task[]>(`${environment.apiURL}`)
  }
deleteTask(tasksId:number):Observable<void>{
    return this._httpClient.delete<void>(`${environment.apiURL}/${tasksId}`);
  }
getTaskByID(id: number): Observable<Task> {
    return this._httpClient.get<Task>(`${environment.apiURL}/${id}`);
  }
updateTask(taskId: number, taskData: Task): Observable<Task> {
    return this._httpClient.patch<Task>(`${environment.apiURL}/${taskId}`,taskData,)
  }
saveTask(task:Task){
    return this._httpClient.post<Task>(`${environment.apiURL}/`,task)
  }
}
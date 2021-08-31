import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Task } from './task';

 
@Injectable({
  providedIn: 'root'
})
export class TasksService {
  private _getUrl = "api/tasks";
  constructor(private http:HttpClient) { }
  getTasks():Observable<Task[]>{
    return this.http.get<Task[]>(this._getUrl).pipe(
      catchError(this.handleError<Task[]>('getTasks',[]))
    );    
  }
  handleError<T>(operation='operation', result?:T){
    return (error:any):Observable<T>=>{
      console.error(error)      
      return error;

    }
  }
   updateTask(body):Observable<Task>{
    return this.http.put<Task>(this._getUrl,body);
  }

  removeTask(id){

    return this.http.delete<Task>(`api/tasks/${id}`);
  }

  addTask(body){
    return this.http.post<Task>(this._getUrl,body);
  }

  
  
}

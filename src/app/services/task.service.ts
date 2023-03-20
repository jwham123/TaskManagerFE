import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { Task } from '../models/task';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private httpClient:HttpClient) { }
  
  authUrl: string =`${environment.baseUrl}/task`;


  createTask(name:String, description:String, date:String, time:String, estTime:number):Observable<Task> {
    const payload= {name:name, description:description, date:date, time:time, estTime:estTime};
    return this.httpClient.post<any>(`${this.authUrl}/create`,payload, {headers:environment.headers, withCredentials: true});
  }

  getYourTasks():Observable<Task[]> {
    return this.httpClient.get(`${this.authUrl}/get`, {
      headers:{
        accept:"application/json"
      },withCredentials:true
    }) as Observable<Task[]>
  }
}

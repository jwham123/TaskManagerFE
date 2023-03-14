import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { Task } from '../models/task';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  authUrl: string = `${environment.baseUrl}/user`;
  loggedIn: boolean = false;

  constructor(private http: HttpClient) { }

  login(email:string, password:string): Observable<any> {
    const payload = {email:email, password:password};
    return this.http.post<any>(`${this.authUrl}/login`, payload, {headers: environment.headers, withCredentials: environment.withCredentials});
  }

  logout(): void {
    this.http.post(`${this.authUrl}/logout`,null);
  }

  register(email:string, password:string, username:string, role:string, tickets:Array<Task>): Observable<any> {
    const payload = {email:email, password:password, username:username, role:role, tickets:tickets};
    return this.http.post<any>(`${this.authUrl}/register`, payload, {headers: environment.headers});
  }
}

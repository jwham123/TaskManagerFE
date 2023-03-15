import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { BehaviorSubject, map, Observable } from 'rxjs';
import { Task } from '../models/task';
import { environment } from '../environments/environment';
import { ObservableStore } from '@codewithdan/observable-store';
import { StoreState } from '../interfaces/storeState';
import { CookieService } from 'ngx-cookie-service';


@Injectable({
  providedIn: 'root'
})
export class AuthService extends ObservableStore<StoreState>{ // must npm install @codewithdan/observable-store

  authUrl: string = `${environment.baseUrl}/user`;
  
  private loginStatus = new BehaviorSubject<boolean>(this.checkLoginStatus());
  private firstName = new BehaviorSubject<string>(this.cookieService.get('firstName'));

  constructor(private http: HttpClient, private cookieService: CookieService) 
  { 
    super({ logStateChanges: true, trackStateHistory: true});

    this.loginStatus.subscribe((result) => {
      this.setState( {loggedInStatus: result}, 'LOGGED_IN_STATUS');
    })  
    
  }

  checkLoginStatus(): boolean {
    let loginCookie = this.cookieService.get('loginStatus');
    
    return loginCookie == '1';
  }












  login(email:string, password:string): Observable<any> {
    let isSessionActive = localStorage.getItem('isSessionActive');

   

    const payload = {email:email, password:password};
    return this.http.post<any>(`${this.authUrl}/login`, payload, {headers: environment.headers, withCredentials: environment.withCredentials})
    .pipe(
      map(() => {
          console.log("before: "+this.loginStatus.value);
          this.loginStatus.next(true);
          console.log("after: "+this.loginStatus.value);
          this.firstName.next(this.cookieService.get('firstName'));
            }));
  }












  logout(): void {
    this.http.post(`${this.authUrl}/logout`,null);
  }

  register(firstName:string, lastName:string, email:string, password:string, tickets:Array<Task>): Observable<any> {
    const payload = {firstName:firstName, lastName:lastName, email:email, password:password, tickets:tickets};
    return this.http.post<any>(`${this.authUrl}/register`, payload, {headers: environment.headers});
  }

  get currentfirstName() {
    return this.firstName.asObservable();
  }
}

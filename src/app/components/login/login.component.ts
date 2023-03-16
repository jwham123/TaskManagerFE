import { state } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { UntypedFormGroup, UntypedFormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { Task } from 'src/app/models/task';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{

  loginError = false;
  registerError1 = false;
  registerError2 = false;
  loginStatus$ = new BehaviorSubject<boolean>(false);

  tasks:Task[] = [];

  registerForm = new UntypedFormGroup({
    firstName: new UntypedFormControl(''),
    lastName: new UntypedFormControl(''),
    email: new UntypedFormControl(''),
    password: new UntypedFormControl(''),
    confirmPassword: new UntypedFormControl('')
  })
  
  loginForm = new UntypedFormGroup({
    email: new UntypedFormControl(''),
    password: new UntypedFormControl('')
  })

  loginVisi:boolean = true;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.authService.globalStateChanged.subscribe(state => {
      this.loginStatus$.next(state.loggedInStatus)
    });
  }
  
  switchVisi() {
    this.loginVisi = !this.loginVisi;
  }

  onSubmitLogin(): void {
    console.log(this.authService);

    this.authService.login(this.loginForm.get('email')?.value, this.loginForm.get('password')?.value).subscribe(
      () => {
        this.loginError=false;
      },
      (err) => this.loginError=true,
      () => 
      setTimeout(() => {
        this.router.navigate(['home']);
      }, 1),
      
    );
  }

  onSubmitRegister(): void {
    if (this.registerForm.get('password')?.value != this.registerForm.get('confirmPassword')?.value) { // compares password values
           this.registerError2 = true;
           return;
        }
        this.registerError2 = false;
    this.authService.register(this.registerForm.get('firstName')?.value, this.registerForm.get('lastName')?.value, this.registerForm.get('email')?.value, this.registerForm.get('password')?.value, this.tasks).subscribe(
      () => {
        console.log("New user registered");
        this.registerError1 = false;
      },
      (err) => {
        this.registerError1=true // email already has an account associated with it
      },
      () =>
      setTimeout(() => {
        this.loginVisi=false;
      }, 1000),
    );
  }

}

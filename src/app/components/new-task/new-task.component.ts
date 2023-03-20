import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-new-task',
  templateUrl: './new-task.component.html',
  styleUrls: ['./new-task.component.css']
})
export class NewTaskComponent implements OnInit {

  
  // name:string='';
  // description?:string;
  // date?:string;
  // time?:string;
  // estTime?:number;
  // completed:boolean = false;
  // user?:User;

  taskForm = new UntypedFormGroup({
    name: new UntypedFormControl(''),
    description: new UntypedFormControl(''),
    date: new UntypedFormControl(''),
    time: new UntypedFormControl(''),
    estTime: new UntypedFormControl('')
  })
  
  constructor(
    private authService:AuthService,
    private taskService:TaskService,
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
      
  }

  createTask() {
    this.taskService.createTask(this.taskForm.get('name')?.value, this.taskForm.get('description')?.value, this.taskForm.get('date')?.value, this.taskForm.get('time')?.value,
    this.taskForm.get('estTime')?.value).subscribe (
      () => {
        console.log('Success');
      },
      (err) => console.log(err)
    );
  }
}

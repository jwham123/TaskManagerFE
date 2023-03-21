import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { TaskService } from 'src/app/services/task.service';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
// import { DateAdapter } from '@angular/material/core';

@Component({
  selector: 'app-new-task',
  templateUrl: './new-task.component.html',
  styleUrls: ['./new-task.component.css']
})
export class NewTaskComponent implements OnInit {

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
    //private dateAdapter: DateAdapter<Date>
  ) {}

  ngOnInit(): void {
      
  }

  createTask() {
    const dateObj = this.taskForm.get('date')?.value;
    const jsonString = JSON.stringify(dateObj);
    console.log(jsonString);
    console.log(typeof jsonString);
    console.log(jsonString.substring(0,9));

    this.taskService.createTask(this.taskForm.get('name')?.value, this.taskForm.get('description')?.value, this.taskForm.get('date')?.value, this.taskForm.get('time')?.value,
    this.taskForm.get('estTime')?.value).subscribe (
      () => {
        console.log('Success');
      },
      (err) => console.log(err)
    );
  }

  // onDateInput(event: MatDatepickerInputEvent<Date> | null) {
  //   if (event !== null) {
  //     const parsedDate = this.dateAdapter.format(event?.value, 'MM/dd/yyyy');
  //     console.log('parsed date: '+parsedDate);
  //   }
    
    
  //}
}

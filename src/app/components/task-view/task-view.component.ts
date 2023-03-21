import { Component, OnInit } from '@angular/core';
import { Task } from 'src/app/models/task';
import { AuthService } from 'src/app/services/auth.service';
import { TaskService } from 'src/app/services/task.service';
import { CompletedPipe } from 'src/app/pipes/completed.pipe';

@Component({
  selector: 'app-task-view',
  templateUrl: './task-view.component.html',
  styleUrls: ['./task-view.component.css']
})
export class TaskViewComponent implements OnInit {

tasks:Task[]=[];

constructor(
  private authService:AuthService,
  private taskService:TaskService
) {}

ngOnInit(): void {
  this.taskService.getYourTasks().subscribe({
    next:(taskData:Task[])=> {
      this.tasks = taskData;
      console.log('work please: '+this.tasks);
    },
    error:(error)=>{
      console.log("unable to get tasks "+error);
    }
  }); 
}

getTasks() {
  
}
}

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CalendarViewComponent } from './components/calendar-view/calendar-view.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { LoginComponent } from './components/login/login.component';
import { NewTaskComponent } from './components/new-task/new-task.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { TaskViewComponent } from './components/task-view/task-view.component';

const routes: Routes = [
  { path: "",  redirectTo: "/home", pathMatch:"full"},
  { path: "login", component:LoginComponent},
  { path: "home", component:HomePageComponent},
  { path: "sideBar", component:SidebarComponent},
  { path: "newTask", component:NewTaskComponent},
  { path: "taskView", component:TaskViewComponent},
  { path: "calendarView", component:CalendarViewComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

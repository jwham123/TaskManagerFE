import { Component, OnInit } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BehaviorSubject, Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { state } from '@angular/animations';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  loginStatus$ = new BehaviorSubject<boolean>(false);
  firstName$?:Observable<String>;
  opened = true;

  compNum:number = 0;


  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.authService.globalStateChanged.subscribe(state => {
      this.loginStatus$.next(state.loggedInStatus)
    });

    this.firstName$ = this.authService.currentfirstName;
  }

  goToHome() {
    this.router.navigate(['/home']);
  }

  getCurrentRoute() {
    let currentRoute = window.location.href.slice(22);
    console.log(currentRoute);

    // switch(currentRoute) {
    //   case "newTask":
    //     this.compNum = 1;
    //     console.log("compNum: "+this.compNum);
    //     break;
    //   case "taskView":
    //     this.compNum = 2;
    //     console.log("compNum: "+this.compNum);
    //     break;
    //   case "calendarView":
    //     this.compNum = 3;
    //     console.log("compNum: "+this.compNum);
    //     break;
    //   default:
    //     this.compNum = 0;
    //     console.log("compNum: "+this.compNum);
    //   }

    if (currentRoute == 'newTask') {
      this.compNum = 1;
    } else if (currentRoute == 'taskView') {
      this.compNum = 2;
    } else if (currentRoute == 'calendarView') {
      this.compNum = 3;
    } else {
      this.compNum = 0;
    }
    console.log(this.compNum);
  }
}

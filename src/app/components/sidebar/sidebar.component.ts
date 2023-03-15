import { Component, OnInit } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BehaviorSubject, Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { state } from '@angular/animations';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  loginStatus$ = new BehaviorSubject<boolean>(false);
  firstName$?:Observable<String>;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.authService.globalStateChanged.subscribe(state => {
      this.loginStatus$.next(state.loggedInStatus)
    });

    this.firstName$ = this.authService.currentfirstName;
  }

  
}

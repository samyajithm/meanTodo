import { Component, OnInit } from '@angular/core';
import {RouterOutlet} from "@angular/router";
import {fadeAnimation} from "../../../animations/fade.animation";
import { AuthService } from 'ui/app/services/auth/auth.service';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss'],
  animations: [fadeAnimation]
})
export class TaskComponent implements OnInit {

  loggedInUser: any = { };
  loading: boolean = false;
  constructor(public authService: AuthService) { }

  ngOnInit() {
    this.loading = true;
    this.loggedInUser = this.authService.getUser();
    this.loading = false;
  }

  getRouterOutletState(outlet: RouterOutlet) {
    return outlet && outlet.isActivated ? outlet.activatedRoute : '';
  }

  /*Function to log user out*/
  logout() {
    this.loading = true;
    this.authService.logout();
    this.loading = false;
  }
}

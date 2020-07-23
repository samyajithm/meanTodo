import { Component, OnInit } from '@angular/core';
import {RouterOutlet} from "@angular/router";
import {fadeAnimation} from "../../../animations/fade.animation";

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss'],
  animations: [fadeAnimation]
})
export class TaskComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  getRouterOutletState(outlet: RouterOutlet) {
    return outlet && outlet.isActivated ? outlet.activatedRoute : '';
  }
}

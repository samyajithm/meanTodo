import { Component, OnInit } from '@angular/core';
import {TranslateService} from "@ngx-translate/core";
import {RouterOutlet} from "@angular/router";
import {fadeAnimation} from "./animations/fade.animation";
import { AuthService } from './services/auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [fadeAnimation]
})
export class AppComponent implements OnInit {
  browserLangs: any = [];
  todoAppLangs: any = ['en'];

  constructor(private translate: TranslateService,
              private authService: AuthService) {
    this.setDefaultLang();
  }

  ngOnInit() {
    // Function to check or auto authenticate the already logged in user when route changed or refresh
    this.authService.autoAuthUser();
  }

  // Localization support
  setDefaultLang() {
    this.browserLangs = navigator.languages || ['en'];
    for (let lang of this.browserLangs){
      if(this.todoAppLangs.indexOf(lang) !== -1) {
        this.translate.setDefaultLang(lang);
        break;
      }
    }
  }

  getRouterOutletState(outlet: RouterOutlet) {
    return outlet && outlet.isActivated ? outlet.activatedRoute : '';
  }
}

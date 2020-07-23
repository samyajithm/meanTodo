import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { LoadingService } from 'ui/app/services/loading/loading.service';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'ui/app/services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  title: string = '';
  state: string = '';

  constructor(public loadingService: LoadingService,
              public activatedRoute: ActivatedRoute,
              public authService: AuthService) {
              }

  ngOnInit() {
    /* If routed to login page clear all the auth info from storage*/
    this.authService.clearAuthData();

    /*Get title and state from route data*/
    if (this.activatedRoute.snapshot && this.activatedRoute.snapshot.data && this.state != this.activatedRoute.snapshot.data['state']) {
      this.title = this.activatedRoute.snapshot.data['title'];
      this.state = this.activatedRoute.snapshot.data['state'];
    }
  }

  formSubmit(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.loadingService.startLoading();
    if(this.state == 'login') {
      this.login(form);
    } else {
      this.signup(form);
    }
  }

  login(form: NgForm) {
      this.authService.login(form.value.email, form.value.password)
  }

  signup(form: NgForm) {
    let signupData = {
      email: form.value.email,
      password: form.value.password,
      firstName: form.value.firstName,
      lastName: form.value.lastName
    };

    this.authService.signup(signupData);
  }
}

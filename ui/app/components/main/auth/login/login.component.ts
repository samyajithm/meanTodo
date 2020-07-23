import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { LoadingService } from 'ui/app/services/loading/loading.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'ui/app/services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  
  title: string = '';
  state: string = '';
  token: string = '';
  isAuthenticated: boolean = false;
  userId: any;

  constructor(public loadingService: LoadingService,
              public activatedRoute: ActivatedRoute,
              public authService: AuthService,
              public router: Router) {
              }

  ngOnInit() {
    if (this.activatedRoute.snapshot && this.state != this.activatedRoute.snapshot.data['state']) {
      this.title = this.activatedRoute.snapshot.data['title'];
      this.state = this.activatedRoute.snapshot.data['state'];
    }
  }

  formSubmit(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.loadingService.startLoading();
    if(this.state == 'loading') {
      this.login(form);
    } else {
      this.signup(form);
    }
  }

  login(form: NgForm) {
      this.authService.login(form.value.email, form.value.password)
          .subscribe(response => {
              const token = response.token;
              this.token = token;
              if (token) {
                const expiresInDuration = response.expiresIn;
                this.isAuthenticated = true;
                this.userId = response.userId;
                const now = new Date();
                const expirationDate = new Date(
                  now.getTime() + expiresInDuration * 1000
                );
                console.log(expirationDate);
                this.router.navigate(["/task/pending"]);
              }
            },
            error => {
              console.log(error)
            });
  }

  signup(form: NgForm) {
      this.authService.createUser(form.value.email, form.value.password)
          .subscribe(() => {
              this.router.navigate(["/login"]);
            },
            error => {
              console.log(error)
            });
  }
}

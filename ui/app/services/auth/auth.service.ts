import { Injectable } from '@angular/core';
import { environment } from "../../../environments/environment";
import { HttpClient } from '@angular/common/http';
import { LoginData, SignupData } from 'ui/app/types/auth';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { finalize } from 'rxjs/internal/operators';
import { LoadingService } from '../loading/loading.service';
import { SnackbarService } from '../snackbar/snackbar.service';

/*
*   Service to handle all the auth service
*/

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  private isAuthenticated = false;
  private token: string;
  private tokenTimer: any;
  private user: any;
  private authStatusListener = new Subject<boolean>();
  private serverUrl = environment.server ? environment.server : '';

  constructor(private http: HttpClient,
              private router: Router,
              private loadingService: LoadingService,
              private snackbar: SnackbarService) {}

  /* Function to add/create user - user registration */
  signup(userObj) {
    let SignupData: SignupData;
    if(userObj) {
      SignupData = { email: userObj.email,
                   password: userObj.password,
                   firstName: userObj.firstName,
                   lastName: userObj.lastName };
    }

    this.loadingService.startLoading()
    this.http.post(this.serverUrl + "/user/signup", SignupData)
    .pipe(finalize(() => {
      this.loadingService.stopLoading()
    }))
    .subscribe(() => {
        this.router.navigate(["/login"]);
      },
      error => {
        if(error && error.error && error.error.errorMsg && error.error.errorMsg.length > 0) {
          this.snackbar.open("error", {
            translate: false,
            data: error.error.errorMsg
          })
        } else {
          this.snackbar.open("error", {
            translate: true,
            data: 'snackBarError.signup'
          })
        }
        this.authStatusListener.next(false);
      }
    );
  }

  /*Function to login user*/
  login(email: string, password: string) {
    const loginData: LoginData = { email: email, password: password };
    this.loadingService.startLoading();
    this.http.post<{ token: string; expiresIn: number; userId: string }>(this.serverUrl + "/user/login", loginData)
      .pipe(finalize(() => {
        this.loadingService.stopLoading();
      }))
      .subscribe( (response: any) => {
          const token = response.token;
          this.token = token;
          if (token) {
            const expiresInDuration = response.expiresIn;
            this.setAuthTimer(expiresInDuration);
            this.isAuthenticated = true;
            this.user = response.user;
            this.authStatusListener.next(true);
            const now = new Date();
            const expirationDate = new Date(
              now.getTime() + expiresInDuration * 1000
            );
            this.saveAuthData(token, expirationDate, this.user);
            this.router.navigate(["/task/pending"]);
          }
        },
        error => {
          if(error && error.error && error.error.errorMsg && error.error.errorMsg.length > 0) {
            this.snackbar.open("error", {
              translate: false,
              data: error.error.errorMsg
            })
          } else {
            this.snackbar.open("error", {
              translate: true,
              data: 'snackBarError.login'
            })
          }
          this.authStatusListener.next(false);
        }
      );
  }

  /*Function to check whether user is authenticated and if yes keeps the user logged in*/
  autoAuthUser() {
    const authInformation: any = this.getAuthData();
    if (!authInformation) {
      return;
    }
    const now = new Date();
    const expiresIn = authInformation.expirationDate.getTime() - now.getTime();
    if (expiresIn > 0) {
      this.token = authInformation.token;
      this.isAuthenticated = true;
      this.user = authInformation.user;
      this.setAuthTimer(expiresIn / 1000);
      this.authStatusListener.next(true);
    }
  }

  getToken() {
    return this.token;
  }

  getIsAuth() {
    return this.isAuthenticated;
  }

  getUser() {
    return this.user;
  }

  getAuthStatusListener() {
    return this.authStatusListener.asObservable();
  }

  /* Function to log user out and remove all session*/
  logout() {
    this.token = null;
    this.isAuthenticated = false;
    this.authStatusListener.next(false);
    this.user = {};
    clearTimeout(this.tokenTimer);
    this.clearAuthData();
    this.router.navigate(["/login"]);
  }

  /*Remove all auth storage*/
  clearAuthData() {
    localStorage.removeItem("token");
    localStorage.removeItem("expiration");
    localStorage.removeItem("user");
  }

  private setAuthTimer(duration: number) {
    this.tokenTimer = setTimeout(() => {
      this.logout();
    }, duration * 1000);
  }

  /*Set auth information*/
  private saveAuthData(token: string, expirationDate: Date, user: any) {
    localStorage.setItem("token", token);
    localStorage.setItem("expiration", expirationDate.toISOString());
    localStorage.setItem("user", JSON.stringify(user));
  }

  /* Retrieve auth information*/
  private getAuthData() {
    const token = localStorage.getItem("token");
    const expirationDate = localStorage.getItem("expiration");
    const user = JSON.parse(localStorage.getItem("user"));
    if (!token || !expirationDate) {
      return;
    }
    return {
      token: token,
      expirationDate: new Date(expirationDate),
      user: user
    };
  }
}

import { Injectable } from '@angular/core';
import { environment } from "../../../environments/environment";
import { HttpClient } from '@angular/common/http';
import { AuthData } from 'ui/app/types/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  serverUrl = environment.server ? environment.server : '';

  constructor(private http: HttpClient) { }

  createUser(email: string, password: string) {
    const authData: AuthData = { email: email, password: password };
    return this.http.post(this.serverUrl + "/signup", authData);
  }

  login(email: string, password: string) {
      const authData: AuthData = { email: email, password: password };
      return this.http.post<{ token: string; expiresIn: number; userId: string }>(this.serverUrl + "/login", authData)
  }
}

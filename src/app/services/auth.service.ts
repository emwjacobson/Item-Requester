import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  loggedIn: boolean;

  constructor() {
    this.loggedIn = false;
  }

  public login(): void {
    this.loggedIn = true;
  }

  public logout(): void {
    this.loggedIn = false;
  }

  public isLoggedIn(): boolean {
    return this.loggedIn;
  }
}

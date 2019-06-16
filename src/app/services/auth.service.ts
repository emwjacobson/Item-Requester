import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { User } from 'firebase';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  user: User;
  logged_in: boolean;

  constructor(private auth: AngularFireAuth) {
    this.logged_in = false;
    this.auth.user.subscribe((user) => {
      if (user) {
        this.logged_in = true;
      }
      this.user = user;
    });
  }

  public login(username: string, password: string): Promise<firebase.auth.UserCredential> {
    return this.auth.auth.signInWithEmailAndPassword(username, password).then((val) => {
      this.user = val.user;
      this.logged_in = true;
      return val;
    }, (res) => {
      throw res;
    });
  }

  public logout(): void {
    this.auth.auth.signOut().then(() => {
      this.logged_in = false;
    }).catch((res) => {
      console.log('Error logging out', res);
    });
  }

  public isLoggedIn(): boolean {
    return this.logged_in;
  }
}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { FormGroup, FormControl } from '@angular/forms';
import { SourceNode } from 'source-list-map';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LoginComponent implements OnInit {
  alert = {
    type: '',
    message: ''
  };
  loginGroup = new FormGroup({
    username: new FormControl(''),
    password: new FormControl('')
  });

  constructor(private router: Router, private auth: AuthService) {
  }

  ngOnInit() {
  }

  public submit() {
    this.auth.login(this.loginGroup.value.username, this.loginGroup.value.password).then((val) => {
      this.alert = { type: 'success', message: 'Logged in successfully! Redirecting...' };
      setTimeout(() => {
        this.router.navigate(['']);
      }, 1000);
    }, (res) => {
      // this.alert = {
      //   type: 'danger',
      //   message: res.message
      // };
      switch (res.code) {
        case 'auth/invalid-email':
          this.alert = { type: 'danger', message: 'Invalid email address.' };
          break;
        case 'auth/user-disabled':
          this.alert = { type: 'danger', message: 'User account has been disabled.' };
          break;
        case 'auth/user-not-found':
          this.alert = { type: 'danger', message: 'User account not found' };
          break;
        case 'auth/wrong-password':
          this.alert = { type: 'danger', message: 'Password incorrect.' };
          break;
        default:
          console.log(res);
          this.alert = { type: 'danger', message: 'Something happened that I wasnt prepared for.' };
          break;
      }
    });
  }

}

import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {
  title = 'Item-Requester';
  pages = [
    { title: 'Home', addr: '' },
    { title: 'Reserve', addr: 'res' },
    { title: 'Item List', addr: 'items' }
  ];

  constructor(private auth: AuthService) {

  }

  public getPages(): Object[] {
    return this.isLoggedIn() ? this.pages : [];
  }

  public isLoggedIn(): boolean {
    return this.auth.isLoggedIn();
  }
}

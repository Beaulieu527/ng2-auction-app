import { Component, Input } from '@angular/core';
import { AngularFire, AuthProviders, AuthMethods } from 'angularfire2';

@Component({
    selector: 'header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  constructor(public af: AngularFire) {}
  @Input() issignedin: String;
  signout(): void {
    console.log('signed out');
    this.af.auth.logout().then((succSignOut) => {
      console.log('sign out', succSignOut);
    }
      , (err) => {
        console.log('sign out Err', err);
      });
  }
}
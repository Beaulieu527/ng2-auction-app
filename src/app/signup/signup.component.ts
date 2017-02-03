import { Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AngularFire, AuthProviders, AuthMethods } from 'angularfire2';

import { Login } from '../login/login';

@Component({
  selector: 'signup',
  templateUrl: './signup.component.html',
})
export class SignupComponent  {
    constructor(public af: AngularFire) {}
    name = 'login';
    credentials: Login = {
        email: 'a@a.com',
        password: 'kaka'
    };
    signupUser(credentials: Login):void{
    var creds: any = {email: credentials.email, password: credentials.password};
    this.af.auth.createUser(creds).then(function(userCreated){
      console.log('userCreated')
    },function(error){
      console.log('userCreation error')
    });
  }
}

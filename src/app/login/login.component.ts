import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {MdSnackBar} from '@angular/material';
import { AngularFire, AuthProviders, AuthMethods, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';

import { Login, SignupSchema } from '../login/login';
@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent  {
  users: FirebaseObjectObservable<any[]>;
  constructor(
    public af: AngularFire,
    private router: Router,
    public snackBar: MdSnackBar
    ) {
      
    }
  signedIn:boolean = true;
  credentialsignup:any;
  snackbarmessage: string;
  name = 'login';
  credentials: Login = {
    email: 'a@a.com',
    password: '123456'
  };
  signupuser: SignupSchema = {
    email: '',
    password: '',
    name: '',
    username: ''
  };
  signinUser(credentials: Login): void {
    console.log(credentials);
    this.af.auth.login({
      email: credentials.email,
      password: credentials.password,
    },
      {
        provider: AuthProviders.Password,
        method: AuthMethods.Password,
      }).then((data)=>{
        console.log('signed in')
        sessionStorage.setItem('uid',data.uid);
        this.router.navigate(['/home']);
      });
    this.signedIn = false;
  }
  signupUser(credentials):void{
    var creds: any = { email: credentials.email, password: credentials.password };
    this.af.auth.createUser(creds).then((userCreated) => {
      delete credentials.password;
      credentials.uid = userCreated.uid;
      credentials.role = 'auctioneer';
      this.users = this.af.database.object(`/users/${credentials.uid}`);
      this.users.set(credentials);
      this.snackbarmessage = `user ${credentials.name} created`;
      this.snackBar.open(this.snackbarmessage, 'Done', {
        duration: 2000,
      });
      sessionStorage.setItem('uid',userCreated.uid);
      this.router.navigate(['/home']);
    },(error)=>{
      this.snackbarmessage = `ERROR: while creating user ${credentials.name}`;
      this.snackBar.open(this.snackbarmessage, 'Dance', {
      duration: 2000,
    });
      console.log('userCreation error')
    });
  }
}

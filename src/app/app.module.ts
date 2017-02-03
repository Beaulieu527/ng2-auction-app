import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes, Router } from '@angular/router';
import { MaterialModule } from '@angular/material';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import 'hammerjs';
import { AngularFireModule, AuthProviders, AuthMethods } from 'angularfire2';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { AuctionComponent } from './auction/auction.component';
import { BidderComponent } from './bidder/bidder.component';
import { HomeComponent } from './home/home.component';
import { ProductDetailComponent } from './productDetail/productDetail.component';
import { BookingModalComponent } from './modal/bookingmodal.component';

const myFirebaseConfig = {
  apiKey: "AIzaSyBclLCfBOSx8CbkKg9uKwAqh_Pu2a5aRr8",
  authDomain: "node-foodapp.firebaseapp.com",
  databaseURL: "https://node-foodapp.firebaseio.com",
  storageBucket: "node-foodapp.appspot.com",
  messagingSenderId: "144848186764"
};
const myFirebaseAuthConfig = {
  provider: AuthProviders.Custom,
  method: AuthMethods.Redirect
};

const appRoutes: Routes = [
  {
    path: '',
    component: LoginComponent
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'home/product/:id',
    component: ProductDetailComponent
  },
  {
    path: 'auction',
    component: AuctionComponent
  },
  {
    path: 'bidder',
    component: BidderComponent
  }
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    HomeComponent,
    SignupComponent,
    BookingModalComponent,
    AuctionComponent,
    BidderComponent,
    ProductDetailComponent
  ],
  entryComponents: [
    BookingModalComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes),
    MaterialModule.forRoot(),
    AngularFireModule.initializeApp(myFirebaseConfig)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

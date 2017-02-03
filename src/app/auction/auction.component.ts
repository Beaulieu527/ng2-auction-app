import { Component, Injectable } from '@angular/core';
import { MdDialog, MdDialogRef, MdDialogConfig } from '@angular/material';
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';
import * as firebase from 'firebase';

import { Auction } from './auction';

// import { Login, SignupSchema } from '../login/login';

@Component({
  selector: 'auction',
  templateUrl: './auction.component.html',
  styleUrls: ['./auction.component.css']
})
export class AuctionComponent {
  sessionUid:string = sessionStorage.getItem('uid') 
  product: Auction = {
    category: '',
    auctionDate: '',
    name: '',
    startTime: '',
    description:'',
    startingBid:0,
    endTime: '',
    image: {}
  };
  imageArr:any = {};
  item: FirebaseListObservable<any[]>;
  currentuser: FirebaseObjectObservable<any[]>;
  currentuserObj:any = {};
  constructor(
    public af: AngularFire
  ) {
    this.item = this.af.database.list('/products');
    this.currentuser = this.af.database.object(`/users/${this.sessionUid}`);
    this.currentuser
      .subscribe(productsArr => {
        this.currentuserObj = productsArr;
      })
   }
   
   onChangeImage(event){
     console.log(this.currentuser)
     let imgFile = event.target.files[0];
     console.log(imgFile);
     this.imageArr = (imgFile);
   }
  
   uploadImageToFirebase(imgFile, resolve) {
     var storageRef = firebase.storage().ref().child('images').child(imgFile.name);
     // Upload file to Firebase Storage
     var uploadTask = storageRef.put(imgFile);
     uploadTask.on('state_changed', null, null, function () {
       var downloadUrl = uploadTask.snapshot.downloadURL;
       console.log(downloadUrl);
       resolve(downloadUrl);
     })
   }
  onSubmit(prod) {
    prod.postedBy = this.currentuserObj.username;
    prod.currentBid = prod.startingBid;
    console.log(prod)
    let imgFile = this.imageArr;
    var uploadPromiseImgs = new Promise((resolve, reject)=> {
      this.uploadImageToFirebase(imgFile, resolve);
    });
    Promise.all([uploadPromiseImgs]).then((data)=> {
      prod.image = data[0];
      this.item.push(prod);
    }).catch(function (err) {
      console.log(err);
    });
  }
}
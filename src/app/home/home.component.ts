import { Component } from '@angular/core';
import { MdDialog, MdDialogRef, MdDialogConfig } from '@angular/material';
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';

import { Login } from '../login/login';
import { ParkingSlotObject } from './home';
import { BookingModalComponent } from '../modal/bookingmodal.component';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  items: FirebaseListObservable<any[]>;
  productsByCategory: any[];
  addSelectedParkingSlotToUser: FirebaseObjectObservable<any[]>;
  bookingSlot: FirebaseObjectObservable<any[]>;
  itemsOfThatCategory;
  testArrItems:any[];
  timeTesting:any;
  constructor(public dialog: MdDialog, public af: AngularFire) {
    this.items = af.database.list('/products');
    this.handleTimer()
    this.items
      .subscribe(productsArr => {
        this.productsByCategory = this.uniq(productsArr, 'category');
        console.log('success', productsArr);
        console.log('this.productsByCategory', this.productsByCategory);
      })
  }
  // implement OnInit's `ngOnInit` method
  // ngOnInit() { this.logIt(); }
  products = [
    { category: 'bags', name: 'Herschel Supply', leastbid: '', highestbid: '', image: 'http://euimages.urbanoutfitters.com/is/image/UrbanOutfittersEU/5850415241258_001_b?$medium$', description: 'This is Button Down Shirt' },
    { category: 'bags', name: 'Fjallraven Kanken Classic Black Backpack', leastbid: '', highestbid: '', image: 'http://euimages.urbanoutfitters.com/is/image/UrbanOutfittersEU/5771452056317_001_b?$medium$', description: 'this is Local Male' },
    { category: 'bags', name: 'Parkland Academy Backpack', leastbid: '', highestbid: '', image: 'https://pics.ae.com/is/image/aeo/0501_4099_001_f?$cat-main_small$', description: 'this is Heritage Collection' },
    { category: 'bags', name: 'Herschel Supply Wheelie', leastbid: '', highestbid: '', image: 'http://scene7.zumiez.com/is/image/zumiez/pdp_hero/Herschel-Supply-Wheelie-Outfitter-Black-Duffle-Bag-_224165-front.jpg', description: 'this is cowboy t' },
  ];

  getMeSortedArr(arr, selectedCategory) {
    let filteredArr = [];
    arr.map((d, i) => {
      if (d.category == selectedCategory) {
        if (d.endTime != '') {
          let getHour = d.endTime.split(':')[0] - d.startTime.split(':')[0];
          let getMinute = d.endTime.split(':')[1] - d.startTime.split(':')[1];
          let allMinutes = +getMinute + (+getHour * 60);
          d.minutes = allMinutes;
          var auctiondate = d.auctionDate;
          let splittedDate = [];
          splittedDate = auctiondate.split('-');
          let thatDate = new Date(splittedDate[0], splittedDate[1], splittedDate[2]).getTime();
          let nowDate = new Date().getTime();
          if (nowDate >= thatDate) {
            d.showDate = true;
          }
        }

        filteredArr.push(d);
      }
    })
    return filteredArr
  }

  handleSelectedItem(selectedCategory) {
    this.items
      .subscribe(productsArr => {
        productsArr.map((d, i) => {
          if (d.auctionDate) {
            d.auctionDate = (new Date(d.auctionDate) + '').split(' ').slice(1,4).join('-');
          }
        })
        this.testArrItems = this.getMeSortedArr(productsArr,selectedCategory);
        console.log(this.testArrItems)
      })
  }

  startTimer(duration) {
    var start = Date.now(),
        diff,
        minutes,
        seconds;
    function timer() {
        // get the number of seconds that have elapsed since 
        // startTimer() was called
        diff = duration - (((Date.now() - start) / 1000) | 0);

        // does the same job as parseInt truncates the float
        minutes = (diff / 60) | 0;
        seconds = (diff % 60) | 0;

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        console.log(minutes + ":" + seconds);

        if (diff <= 0) {
          clearInterval(repeatAfterEverySecond);
            // add one second so that the count down starts at the full duration
            // example 05:00 not 04:59
            start = Date.now() + 1000;
        }
    };
    // we don't want to wait a full second before the timer starts
    timer();
    let repeatAfterEverySecond = setInterval(timer, 1000);
}

handleTimer(){
    var fiveMinutes = 10 * 1;
    this.startTimer(fiveMinutes);
}

  uniq(a, param) {
    return a.filter(function (item, pos, array) {
      return array.map(function (mapItem) { return mapItem[param]; }).indexOf(item[param]) === pos;
    })
  };
  logIt() {
    this.products.map((d, i) => {
      this.items.push(d)
    })
  }
  parkingSlots;
  dialogRef: MdDialogRef<BookingModalComponent>;
  slotDetails: Object;
  newParkingArr: any;
  sessionUid: string = sessionStorage.getItem('uid');
  uidOfParkingArea: string;
}
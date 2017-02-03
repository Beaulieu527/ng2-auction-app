import { Component } from '@angular/core';
import { MdDialog, MdDialogRef, MdDialogConfig } from '@angular/material';
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';

@Component({
  selector: 'bidder',
  templateUrl: './bidder.component.html',
  styleUrls: ['./bidder.component.css']
})
export class BidderComponent {
    items: FirebaseListObservable<any[]>;
    parkingspaces: FirebaseListObservable<any[]>;
    addSelectedParkingSlotToUser: FirebaseObjectObservable<any[]>;
    bookingSlot: FirebaseObjectObservable<any[]>;
    constructor(public dialog: MdDialog, public af: AngularFire) {
        this.items = af.database.list('/products');
        this.parkingspaces = af.database.list('/parkingspaces');
        console.log(this.items)
    }
    handleSelectedItem(item){
        console.log(item);
    }
}
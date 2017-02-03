import { Component } from '@angular/core';
import { MdDialog, MdDialogRef, MdDialogConfig } from '@angular/material';

@Component({
  selector: 'booking-dialog',
  templateUrl: './bookingmodal.component.html',
})
export class BookingModalComponent {
  ngOnInit() { this.logIt(`OnInit`); }
  constructor(public dialogRef: MdDialogRef<BookingModalComponent>) { }
  slotbookdetails = this.dialogRef.componentInstance;
  booking:any = this.slotbookdetails;
  logIt(msg: string) {

  }
  confirmationYes(info){
    info.availability = false;
    console.log('slot info',info)
    this.dialogRef.close(info)
  }
}
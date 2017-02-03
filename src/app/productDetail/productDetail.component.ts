import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MdDialog, MdDialogRef, MdDialogConfig } from '@angular/material';
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';


@Component({
  selector: 'productDetail',
  templateUrl: './productDetail.component.html',
  styleUrls: ['./productDetail.component.css']
})
export class ProductDetailComponent {
    items: FirebaseObjectObservable<any[]>;
 id: string;
 private sub: any;
 productById:Object;
constructor(private route: ActivatedRoute, public af: AngularFire) {}

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
       this.id = params['id']; // (+) converts string 'id' to a number
       console.log('this.id',this.id)
       this.items = this.af.database.object(`/products/${this.id}`);
    this.items
      .subscribe(productsArr => {
        console.log('success', productsArr);
        this.productById = productsArr;
      })

       // In a real app: dispatch action to load the details here.
    });
  }

}
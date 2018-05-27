import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { State } from '../reducers';
import * as sellers from '../actions/sellers.actions';
import { Seller } from '../models/seller.model';

@Component({
  selector: 'app-seller-list',
  templateUrl: './seller-list.component.html'
})
export class SellerListComponent implements OnInit {
  sellers: Seller[]

  constructor(private store: Store<State>) {
    this.store.select('sellers')
      .subscribe((result) => this.sellers = result.sellers.sellers);
  }

  ngOnInit(): void {
    this.store.dispatch(new sellers.LoadSellers());
  }
}

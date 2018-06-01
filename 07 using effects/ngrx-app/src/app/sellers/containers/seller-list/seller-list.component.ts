import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { State } from '../../store/reducers';
import * as sellers from '../../store/actions/sellers.actions';
import { Seller } from '../../models/seller.model';
// import {} from ''
import { GamesService } from '../../../core/services/games.services';

@Component({
  selector: 'app-seller-list',
  templateUrl: './seller-list.component.html'
})
export class SellerListComponent implements OnInit {
  sellers: Seller[];

  constructor(
    private store: Store<State>,
    private games: GamesService
  ) {
    this.store.select('sellers')
      .subscribe((result) => {
        this.sellers = result.sellers.sellers;
      });
  }

  ngOnInit(): void {
    this.games.loadGames().subscribe((gs) => console.log(gs));
    this.store.dispatch(new sellers.LoadSellers());
  }
}

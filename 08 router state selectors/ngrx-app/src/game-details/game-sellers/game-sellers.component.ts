import { Component, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { State } from '../reducers';
import * as gameSellers from '../actions/game-sellers.actions';
import { GameSeller } from '../models/game-seller.model';
import { getSelectedGame } from '../selectors';

@Component({
  selector: 'app-game-sellers',
  templateUrl: './game-sellers.component.html'
})
export class GameSellersComponent implements OnInit {
  sellers: GameSeller[];

  constructor(
    private route: ActivatedRoute,
    private store: Store<State>
  ) {
    this.store.select('gameDetails')
      .subscribe((gameDetails) => {
        this.sellers = gameDetails.gameSellers.gameSellers;
      });
  }

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    this.store.dispatch(new gameSellers.LoadGameSellers(id));
    // this.store.select(getSelectedGame).subscribe((r) => {
    //   console.log(r);
    // });
  }
}

import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromRoot from '../../reducers';
import * as games from '../actions/games.actions'; 
import { Game } from '../models/game.model';

@Component({
  selector: 'app-game-list',
  templateUrl: './game-list.component.html'
})
export class GameListComponent implements OnInit {
  games: Game[];
  constructor(private store: Store<fromRoot.State>) { 
    this.store.select('games')
      .subscribe((stateGames) => {
        this.games = stateGames.games;
      });
  }

  ngOnInit() {
    this.store.dispatch(new games.LoadGames());
  }
}

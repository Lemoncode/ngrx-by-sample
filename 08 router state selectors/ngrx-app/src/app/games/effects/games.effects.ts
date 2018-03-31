import { Injectable } from '@angular/core';
import { GamesService } from '../games.services';
import {
    Effect,
    Actions,
    ofType
} from '@ngrx/effects';
import * as fromGames from '../actions/games.actions';
import { switchMap } from 'rxjs/operators/switchMap';
import { map } from 'rxjs/operators/map';

@Injectable()
export class GamesEffects {
    constructor(
        private gamesService: GamesService,
        private actions$: Actions
    ) {}

    @Effect() games$ = this.actions$.pipe(
        ofType(fromGames.LOAD_GAMES),
        switchMap(
            () => this.gamesService.loadGames()
        ),
        map(
            (gs) => new fromGames.LoadGamesSuccess(gs)
        )
    );
}

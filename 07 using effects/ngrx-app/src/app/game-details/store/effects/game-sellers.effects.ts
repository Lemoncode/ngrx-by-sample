import { Injectable } from '@angular/core';
import { GameSellersService } from '../../game-sellers.service';

import {
    Effect,
    Actions,
    ofType
} from '@ngrx/effects';
import * as fromGameSellers from '../actions/game-sellers.actions';
import { switchMap } from 'rxjs/operators/switchMap';
import { map } from 'rxjs/operators/map';
import { tap } from 'rxjs/operators'

@Injectable()
export class GameSellersEffects {
    constructor(
        private gameSellersService: GameSellersService,
        private actions$: Actions
    ) {}
    @Effect()
    gameSellers$ = this.actions$.pipe(
        ofType(fromGameSellers.LOAD_GAME_SELLERS),
        switchMap((action: fromGameSellers.LoadGameSellers) => {
            return this.gameSellersService.getSellersByGameId(+action.payload);
        }),
        tap((r) => console.log(r)),
        map(
            (gs) => new fromGameSellers.LoadGameSellersSuccess(gs)
        )
    )

}
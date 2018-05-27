import { Action } from '@ngrx/store';
import { GameSeller } from '../../models/game-seller.model';

export const LOAD_GAME_SELLERS = 'LOAD_GAME_SELLERS';
export const LOAD_GAME_SELLERS_SUCCESS = 'LOAD_GAME_SELLERS_SUCCESS';

export class LoadGameSellers implements Action {
    readonly type = LOAD_GAME_SELLERS;
    constructor(public payload: string) {}
}

export class LoadGameSellersSuccess implements Action {
    readonly type = LOAD_GAME_SELLERS_SUCCESS;
    constructor(public payload: GameSeller[]) {}
}

export type Action = LoadGameSellers | LoadGameSellersSuccess; 

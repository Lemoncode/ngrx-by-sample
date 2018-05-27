import { Action } from '@ngrx/store';
import { Game } from '../../models/game.model';

export const LOAD_GAMES = 'LOAD_GAMES';
export const LOAD_GAMES_SUCCESS = 'LOAD_GAMES_SUCCESS';

export class LoadGames implements Action {
    readonly type = LOAD_GAMES;
}

export class LoadGamesSuccess implements Action {
    readonly type = LOAD_GAMES_SUCCESS;
    constructor(public payload: Game[]) {}
}

export type Actions = LoadGames | LoadGamesSuccess;
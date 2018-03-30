import { Action } from '@ngrx/store';

export const LOAD_GAMES = 'LOAD_GAMES';

export class LoadGames implements Action {
    readonly type = LOAD_GAMES;
}

export type Actions = LoadGames;
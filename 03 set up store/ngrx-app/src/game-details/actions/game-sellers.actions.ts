import { Action } from '@ngrx/store';

export const LOAD_GAME_SELLERS = 'LOAD_GAME_SELLERS';

export class LoadGameSellers implements Action {
    readonly type = LOAD_GAME_SELLERS;
    constructor(public payload: string) {}
}

export type Action = LoadGameSellers;

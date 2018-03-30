import { Action } from '@ngrx/store';

export const LOAD_SELLERS = 'LOAD_SELLERS';

export class LoadSellers implements Action {
    readonly type = LOAD_SELLERS;
}

export type Action = LoadSellers;
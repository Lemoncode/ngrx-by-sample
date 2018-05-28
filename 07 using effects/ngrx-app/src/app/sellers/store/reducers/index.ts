import { ActionReducerMap } from '@ngrx/store';
import * as fromRoot from '../../../core/store/reducers'
import * as fromSellers from './sellers.reducer';

export interface SellersState {
    sellers: fromSellers.State
}

export interface State extends fromRoot.State {
    sellers: SellersState
}

export const reducers: ActionReducerMap<SellersState> = {
    sellers: fromSellers.reducer
};

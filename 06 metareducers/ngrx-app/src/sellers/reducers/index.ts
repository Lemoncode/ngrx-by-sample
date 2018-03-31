import * as fromSellers from './sellers.reducer';

export interface SellersState {
    sellers: fromSellers.State
}

export interface State {
    sellers: SellersState
}

export const reducers = {
    sellers: fromSellers.reducer
};
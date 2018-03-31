import * as fromGameSellers from './game-sellers.reducer';

// TODO: Study avoid use GameDetailsState
export interface GameDetailsState {
    gameSellers: fromGameSellers.State;
}

export interface State {
    gameDetails: GameDetailsState
}

// Notice that we are not using ActionReducerMap
export const reducers = {
    gameSellers: fromGameSellers.reducer
};
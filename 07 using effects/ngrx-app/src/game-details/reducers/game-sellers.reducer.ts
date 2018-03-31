import * as gameSellers from '../actions/game-sellers.actions';
import { GameSeller } from '../models/game-seller.model';

export interface State {
    gameSellers: GameSeller[];
}

const initialState = {
    gameSellers: []
};

export const reducer = (
    state: State = initialState,
    action: gameSellers.Action
): State => {
    switch (action.type) {
        case gameSellers.LOAD_GAME_SELLERS_SUCCESS:
            return {
                ...state,
                gameSellers: [...action.payload]
            }
        default:
            return state;
    }
}
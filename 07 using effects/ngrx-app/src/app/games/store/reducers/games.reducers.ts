import * as games from '../actions/games.actions';
import { Game } from '../../models/game.model';

export interface State {
    games: Game[];
}

const initialState = {
    games: []
};

export const reducer = (
    state: State = initialState,
    action: games.Actions
): State => {
    switch (action.type) {
        case games.LOAD_GAMES_SUCCESS:
            return {
                ...state,
                games: [...action.payload]
            }
        default:
            return state;
    }
}
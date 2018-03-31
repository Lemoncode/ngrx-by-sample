import * as games from '../actions/games.actions';
import { Game } from '../models/game.model';

export interface State {
    games: Game[];
}

const initialState = {
    games: []
};

const GAMES = [
    { name: 'Super Mario' },
    { name: 'Zelda' },
    { name: 'Sonic' },
];

export const reducer = (
    state: State = initialState,
    action: games.Actions
): State => {
    // return null;
    switch (action.type) {
        case games.LOAD_GAMES:
            return {
                ...state,
                games: [...GAMES]
            }
        default:
            return state;
    }
}
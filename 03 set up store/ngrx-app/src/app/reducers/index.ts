// This add type checking
import { ActionReducerMap } from '@ngrx/store';
import * as games from '../games/reducers/games.reducers';

export interface State {
    games: games.State
};

export const reducers: ActionReducerMap<State> = {
    games: games.reducer
};
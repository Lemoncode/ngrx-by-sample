import { ActionReducerMap } from '@ngrx/store';
import * as fromRoot from '../../../core/store/reducers';
import * as fromGames from './games.reducers';

export interface GamesState {
    games: fromGames.State;
}

export interface State extends fromRoot.State {
    games: GamesState;
}

export const reducers: ActionReducerMap<GamesState> = {
    games: fromGames.reducer
}
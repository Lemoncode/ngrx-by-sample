// This add type checking
import { ActionReducerMap } from '@ngrx/store';
import { RouterStateUrl } from '../shared/utils';
import * as games from '../games/reducers/games.reducers';
import * as fromRouter from '@ngrx/router-store';

export interface State {
    games: games.State,
    routerReducer: fromRouter.RouterReducerState<RouterStateUrl>
};

export const reducers: ActionReducerMap<State> = {
    games: games.reducer,
    routerReducer: fromRouter.routerReducer
};
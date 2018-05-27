// This add type checking
import { 
    ActionReducerMap, 
    ActionReducer,
    MetaReducer,
    createFeatureSelector
} from '@ngrx/store';
import { RouterStateUrl } from '../shared/utils';
import * as games from '../games/reducers/games.reducers';
import * as fromRouter from '@ngrx/router-store';
import { environment } from '../../environments/environment';
import { RouterReducerState } from '@ngrx/router-store';

export interface State {
    games: games.State,
    routerReducer: fromRouter.RouterReducerState<RouterStateUrl>
};

export const reducers: ActionReducerMap<State> = {
    games: games.reducer,
    routerReducer: fromRouter.routerReducer
};

// We can access the state object of the router.
export const getRouterState = createFeatureSelector<RouterReducerState<RouterStateUrl>>('routerReducer');

const logger = (reducer: ActionReducer<State>): ActionReducer<State> => {
    return (state: State, action: any): State => {
        // console.log(`State: ${state}, Action: ${action}`);
        return reducer(state, action);
    };
}

export const metaReducers: MetaReducer<State>[] = !environment.production ? 
    [logger] : [];
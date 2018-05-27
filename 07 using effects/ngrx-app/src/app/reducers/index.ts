// This add type checking
import { 
    ActionReducerMap, 
    ActionReducer,
    MetaReducer
} from '@ngrx/store';
import { RouterStateUrl } from '../shared/utils';
import * as games from '../games/store/reducers/games.reducers';
import * as fromRouter from '@ngrx/router-store';
import { environment } from '../../environments/environment';

export interface State {
    games: games.State,
    routerReducer: fromRouter.RouterReducerState<RouterStateUrl>
};

export const reducers: ActionReducerMap<State> = {
    games: games.reducer,
    routerReducer: fromRouter.routerReducer
};

const logger = (reducer: ActionReducer<State>): ActionReducer<State> => {
    return (state: State, action: any): State => {
        // console.log(`State: ${state}, Action: ${action}`);
        return reducer(state, action);
    };
}

export const metaReducers: MetaReducer<State>[] = !environment.production ? 
    [logger] : [];
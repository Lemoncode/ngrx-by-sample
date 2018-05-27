import { createSelector, createFeatureSelector } from "@ngrx/store";
import { GameDetailsState } from '../reducers';
import { getRouterState } from '../../app/reducers'
import { GameSeller } from '../models/game-seller.model';
// NOTE: Rename navigations params to avoid colisions. :id => gameId
export const getGameDetailsState = createFeatureSelector<GameDetailsState>(
    'gameDetails'
);

export const getGameSellersEntities = createSelector(
    getGameDetailsState,
    (state: GameDetailsState) => state.gameSellers
)

export const getSelectedGame = createSelector(
    getGameSellersEntities,
    getRouterState,
    (entities, router): GameSeller => {
        return router.state && entities[router.state.params['id']]
    }
);

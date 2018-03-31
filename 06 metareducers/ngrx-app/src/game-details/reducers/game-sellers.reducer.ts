import * as gameSellers from '../actions/game-sellers.actions';
import { GameSeller } from '../models/game-seller.model';

export interface State {
    gameSellers: GameSeller[];
}

const initialState = {
    gameSellers: []
};

const SELLERS = [
    {
      gameName: 'Super Mario',
      name: 'Old Shop',
      amount: 2,
      price: 75.4
    },
    {
      gameName: 'Super Mario',
      name: 'New Shop',
      amount: 1,
      price: 75.4
    },
    {
      gameName: 'Super Mario',
      name: 'Regular Shop',
      amount: 0,
      price: 55.5
    },
  ];

  export const reducer = (
      state:State = initialState,
      action: gameSellers.Action
  ): State => {
      switch (action.type) {
          case gameSellers.LOAD_GAME_SELLERS:
              console.log(action.payload);
              return {
                  ...state,
                  gameSellers: [...SELLERS]
              }
          default:
              return state;
      }
  }
import * as sellers from '../actions/sellers.actions';
import { Seller } from '../../models/seller.model';

export interface State {
    sellers: Seller[];
}

const initialState = {
    sellers: []
};

const SELLERS = [
    {
        name: 'Old Shop'
    },
    {
        name: 'New Shop'
    },
    {
        name: 'Regular Shop'
    },
];

export const reducer = (
    state: State = initialState,
    action: sellers.Action
): State => {
    switch (action.type) {
        case sellers.LOAD_SELLERS:
            return {
                ...state,
                sellers: [...SELLERS]
            }
        default:
            return state;
    }
}
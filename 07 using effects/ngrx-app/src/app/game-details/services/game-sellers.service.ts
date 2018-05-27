import { Injectable } from '@angular/core';
import { GameSeller } from '../models/game-seller.model';
import { Observable } from 'rxjs';

let _gemeSellers = [
    {
        gameId: 1,
        gameName: 'Super Mario',
        sellers: [
            {
                name: 'Old Shop',
                amount: 2,
                price: 75.4
            },
            {
                name: 'New Shop',
                amount: 1,
                price: 75.4
            },
            {
                name: 'Regular Shop',
                amount: 0,
                price: 55.5
            },
        ],
    },
    {
        gameId: 2,
        gameName: 'Zelda',
        sellers: [
            {
                name: 'Old Shop',
                amount: 1,
                price: 65.09
            },
            {
                name: 'Regular Shop',
                amount: 3,
                price: 55.5
            },
        ],
    },
    {
        gameId: 3,
        gameName: 'Sonic',
        sellers: [],
    },
];

@Injectable()
export class GameSellersService {
    getSellersByGameId(id: number): Observable<GameSeller[]> {
        const gameSellers = _gemeSellers
            .filter((g) => g.gameId === id)
            .map((g) => {
                return g.sellers.map(s => {
                    return {
                        gameName: g.gameName,
                        name: s.name,
                        amount: s.amount,
                        price: s.price
                    };
                })
            }).reduce(
                (current, actual) => current.concat(actual),
                []);

        return Observable.of(gameSellers);
    }
}
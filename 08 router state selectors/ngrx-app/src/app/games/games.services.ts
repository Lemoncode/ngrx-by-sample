import { Injectable } from '@angular/core';
import { Game } from './models/game.model';
import { Observable } from 'rxjs';

let _games = [
    { name: 'Super Mario', id: 1 },
    { name: 'Zelda', id: 2 },
    { name: 'Sonic', id: 3 },
];

@Injectable()
export class GamesService {
    loadGames(): Observable<Game[]> {
        return Observable.of(_games);
    }
}
import { Injectable } from '@angular/core';
import { Game } from '../../games/models/game.model';
import { Observable } from 'rxjs';


let _games = [
    { name: 'Super Mario' },
    { name: 'Zelda' },
    { name: 'Sonic' },
];

@Injectable()
export class GamesService {
    loadGames(): Observable<Game[]> {
        return Observable.of(_games);
    }
}
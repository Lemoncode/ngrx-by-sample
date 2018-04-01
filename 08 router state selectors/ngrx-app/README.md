# NgrxApp

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.0.2.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).
Before running the tests make sure you are serving the app via `ng serve`.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

* Change to downgrade rxjs 5.5.6 to 5.1.0

## In this demo we are going to add `router state selectors`

## Steps

### 1. Start by refactoring `game.model.ts` and `games.service.ts`

```diff game.model.ts
export interface Game {
    name: string;
+    id: number;
}
```

```diff games.service.ts
import { Injectable } from '@angular/core';
import { Game } from './models/game.model';
import { Observable } from 'rxjs';

let _games = [
+    { name: 'Super Mario', id: 1 },
-    { name: 'Super Mario' },
+    { name: 'Zelda', id: 2 },
-    { name: 'Zelda' },
+    { name: 'Sonic', id: 3 },
-    { name: 'Sonic' },
];

@Injectable()
export class GamesService {
    loadGames(): Observable<Game[]> {
        return Observable.of(_games);
    }
}
```

### 2. Now we can modify `game-summary.component.html`

```diff
<h2>{{game.name}}</h2>
+<a [routerLink]="['/games', game.id]">
+    Details
+</a>
```
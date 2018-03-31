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

## In this demo we are going to add `ngrx/effects`

## Steps

### 1. Add `app/games/games.service.ts`

```typescript
import { Injectable } from '@angular/core';
import { Game } from './models/game.model';
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

```

### 2. Register the new created service at `app.module.ts`

```diff app.module.ts
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import {
  StoreRouterConnectingModule,
  RouterStateSerializer
} from '@ngrx/router-store';
import { reducers, metaReducers } from './reducers';
import { CustomStateStateSerializer } from './shared/utils';


import { AppComponent } from './app.component';
import { GameSummaryComponent } from './games/game-summary/game-summary.component';
import { GameListComponent } from './games/game-list/game-list.component';

import { GamesService } from './games/games.service';

import { AppRoutingModule } from './app-routing.module';
import { GameDetailsModule } from '../game-details/game-details.module';

@NgModule({
  declarations: [
    AppComponent,
    GameSummaryComponent,
    GameListComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    GameDetailsModule,
    AppRoutingModule,
    StoreModule.forRoot(reducers, {metaReducers}),
    StoreRouterConnectingModule,
    StoreDevtoolsModule.instrument()
  ],
  providers: [
    GamesService,
    { provide: RouterStateSerializer, useClass: CustomStateStateSerializer }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

```

### 3. Add `app/games/effects/games.effects.ts`

```typescript
import { Injectable } from '@angular/core';
import { GamesService } from '../games.service';
import { Effect, Actions } from '@ngrx/effects';
import * as fromGames from '../actions/games.actions';
import { switchMap } from 'rxjs/operators/switchMap';
import { map } from 'rxjs/operators/map';

@Injectable()
export class GamesEffects {
  constructor(
    private gamesService: GamesService,
    private actions$: Actions
  ) {}
}

```

### 4. Now we have to refactor our actions, so we have an cation to request the data, and another one to load the retrieved data.

* Open `app/games/actions/games.actions.ts`

```diff games.actions.ts
import { Action } from '@ngrx/store';
+import { Game } from '../models/game.model';

export const LOAD_GAMES = 'LOAD_GAMES';
+export const LOAD_GAMES_SUCCESS = 'LOAD_GAMES_SUCCESS';

export class LoadGames implements Action {
  readonly type = LOAD_GAMES;
}

+export class LoadGamesSuccess implements Action {
+  readonly type = LOAD_GAMES_SUCCESS;
+  constructor(public payload: Game[]) { }
+}

-export type Actions = LoadGames;
+export type Actions = LoadGames | LoadGamesSuccess;

```

### 5. Now we are going to change our reducer `app/games/reducers/games.reducer.ts`

```diff games.reducer.ts
import * as games from '../actions/games.actions';
import { Game } from '../models/game.model';

export interface State {
  games: Game[];
}

const initialState = {
  games: []
};

-const GAMES = [
-  { name: 'Super Mario' },
-  { name: 'Zelda' },
-  { name: 'Sonic' },
-];
-
export function reducer(state = initialState, action: games.Actions): State {
  switch (action.type) {
-  case games.LOAD_GAMES:
-    return {
-      ...state,
-      games: [...GAMES],
-    };
+    case games.LOAD_GAMES_SUCCESS:
+      return {
+        ...state,
+        games: [...action.payload]
+      };
    default:
      return state;
  }
}

```

### 6. Now we are going to change the effects so it can handle the `side effect request`

```diff
import { Injectable } from '@angular/core';
import { GamesService } from '../games.service';
import { Effect, Actions } from '@ngrx/effects';
import * as fromGames from '../actions/games.actions';
import { switchMap } from 'rxjs/operators/switchMap';
import { map } from 'rxjs/operators/map';

@Injectable()
export class GamesEffects {
  constructor(
    private gamesService: GamesService,
    private actions$: Actions
  ) {}

+  // tslint:disable-next-line:member-ordering
+  @Effect()
+  games$ = this.actions$
+    .ofType(fromGames.LOAD_GAMES)
+    .switchMap(
+      () => this.gamesService.loadGames()
+    )
+    .map(
+      (games) => new fromGames.LoadGamesSuccess(games)
+    );
}

```
### 7. Open `game-list.component.ts`, notice that on ngOnInit we are currently dispatching an action that now will be listen by the games effects.

### 8. Now we have to run our effects. Open `app.module.ts` and modify it.

```diff
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { StoreModule } from '@ngrx/store';
+import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import {
  StoreRouterConnectingModule,
  RouterStateSerializer
} from '@ngrx/router-store';
import { reducers, metaReducers } from './reducers';
import { CustomStateStateSerializer } from './shared/utils';
+import { GamesEffects } from './games/effects/games.effects';


import { AppComponent } from './app.component';
import { GameSummaryComponent } from './games/game-summary/game-summary.component';
import { GameListComponent } from './games/game-list/game-list.component';

import { GamesService } from './games/games.service';

import { AppRoutingModule } from './app-routing.module';
import { GameDetailsModule } from '../game-details/game-details.module';

@NgModule({
  declarations: [
    AppComponent,
    GameSummaryComponent,
    GameListComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    GameDetailsModule,
    AppRoutingModule,
    StoreModule.forRoot(reducers, {metaReducers}),
    StoreRouterConnectingModule,
    StoreDevtoolsModule.instrument(),
+    EffectsModule.forRoot([GamesEffects])
  ],
  providers: [
    GamesService,
    { provide: RouterStateSerializer, useClass: CustomStateStateSerializer }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

```

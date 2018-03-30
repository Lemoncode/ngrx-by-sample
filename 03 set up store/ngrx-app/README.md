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

## In this demo we are going to create an eager module.

## 1. These components will be loaded with AppModule.

* `game-summary.component.*`
* `game-list.component.*`
* `game-stock.service.*`

### 1.1 Create routes for AppModule

* ''
* '/games'

## 2. Create a new module GameDetailsModule. This module will be loaded eagerly.

* `game-sellers.component.*`
* `seller-details.component.*` 
* `create-game.component.*`

### 2.1 Create routes for GameDetailsModule

* 'games/:id'
* 'games/:id/edit'
* 'games/new'

## 3. Create a new module SellersModules. This module will be load lazily.

* `seller-summary.component.*`
* `seller-list.component.*`
* `create-seller.component.*`
* `seller.service.*`

### 3.1 Create routes for SellersModule

* 'sellers'
* 'sellers/:id/edit'
* 'sellers/new'

## Steps

### 1. Now we are going to install our dependecies with `ngrx`

```bash
$ npm i @ngrx/store@4.1.0 @ngrx/effects@4.1.0 @ngrx/router-store@4.1.0 --save
```
```bash
$ npm i typescript@2.6.1 --save-exact
```
```bash
$ npm i typescript@2.6.1 --save-development
```
### 2. Create `app/games/models` 

```typescript
import { Action } from '@ngrx/store';

export const LOAD_GAMES = 'LOAD_GAMES';

export class LoadGames implements Action {
  readonly type = LOAD_GAMES;
}

export type Actions = LoadGames;

```


### 3. Now with this install let's create new folders

* `app/games/reducers`
* `app/games/actions`

### 4. Now we are going to create our first action

```typescript games.actions.ts
import { Action } from '@ngrx/store';

export const LOAD_GAMES = 'LOAD_GAMES';

export class LoadGames implements Action {
  readonly type = LOAD_GAMES;
}

export type Actions = LoadGames;

```
### 5. After this we are going to create our first reducer.

```typescript games.reducers.ts
import * as games from '../actions/games.actions';
import { Game } from '../models/game.model';

export interface State {
  games: Game[];
}

const initialState = {
  games: []
};

const GAMES = [
  { name: 'Super Mario' },
  { name: 'Zelda' },
  { name: 'Sonic' },
];

export function reducer(state = initialState, action: games.Actions): State {
  switch (action.type) {
    case games.LOAD_GAMES:
      return {
        ...state,
        games: [...GAMES],
      };
    default:
      return state;
  }
}

```
### 5. Now we are going to create the seed for our reducers. `src/app/reducers/index.ts`

```typescript
import {ActionReducerMap} from '@ngrx/store';
import * as games from '../games/reducers/games.reducer';

export interface State {
  games: games.State;
};

export const reducers: ActionReducerMap<State> = {
  games: games.reducer
};

```
### 6. Now we are going to register the `StoreModule`, so we can consume the `store on containers` of this module.

```diff app.module.ts
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
+
+import { StoreModule } from '@ngrx/store';
+import { reducers } from './reducers';
+
import { AppComponent } from './app.component';
import { GameSummaryComponent } from './games/game-summary/game-summary.component';
import { GameListComponent } from './games/game-list/game-list.component';

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
+   StoreModule.forRoot(reducers)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

```
### 7. Now it's time to inject the store in our container.

```diff game-list.component.ts
import { Component, OnInit } from '@angular/core';
+import { Store } from '@ngrx/store';
+import * as fromRoot from '../../reducers';
+import * as games from '../actions/games.actions';

@Component({
  selector: 'app-game-list',
  templateUrl: './game-list.component.html'
})
export class GameListComponent implements OnInit {
  games = [
    { name: 'Super Mario' },
    { name: 'Zelda' },
    { name: 'Sonic' },
  ];
-  constructor() { }
+  constructor(private store: Store<fromRoot.State>) { }

  ngOnInit() {
+    this.store.dispatch(new games.LoadGames());
  }
}

```
* Run the application and open the developer tools, and place a break point into `games.reducer.ts`, to watch if the breakpoint it's reached.

### 8. Now we are going to load the `games` from the `store state`.

```diff 
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromRoot from '../../reducers';
import * as games from '../actions/games.actions';
import { Game } from '../models/game.model';

@Component({
  selector: 'app-game-list',
  templateUrl: './game-list.component.html'
})
export class GameListComponent implements OnInit {
-  games = [
-    { name: 'Super Mario' },
-    { name: 'Zelda' },
-    { name: 'Sonic' },
-  ];
+ games: Game[];
 constructor(private store: Store<fromRoot.State>) {
+   this.store.select('games')
+     .subscribe((games) => {
+       this.games = games.games;
+     });
  }

  ngOnInit() {
    this.store.dispatch(new games.LoadGames());
  }
}

```
### 9. Now that we got this working it's time to wire up the other two modules of our application. First of all we are going to need new models.

* Create a new folder `src/game-details/models`

```typescript
export interface GameSeller {
  gameName: string;
  name: string;
  amount: number;
  price: number;
}

```
### 10. Now we are going to create `actions`

* Create a new folder `src/game-details/actions`

```typescript
import { Action } from '@ngrx/store';

export const LOAD_GAME_SELLERS = 'LOAD_GAME_SELLERS';

export class LoadGameSellers implements Action {
  readonly type = LOAD_GAME_SELLERS;
  constructor(public pauload: string){}
}

export type Action = LoadGameSellers;

```
### 11. Now we are going to create `reducers`

* Create a new folder `src/game-details/reducers`

```typescript game-sellers.reducer.ts
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

export function reducer(state = initialState, action: gameSellers.Action): State {
  switch (action.type) {
    case gameSellers.LOAD_GAME_SELLERS:
      console.log(action.payload);
      return {
        ...state,
        gameSellers: [...SELLERS]
      };
    default:
      return state;
  }
}

```
```typescript index.ts
import * as fromGameSellers from './game-sellers.reducer';

export interface GameDetailsState {
  gameSellers: fromGameSellers.State;
}

export interface State {
  'gameDetails': GameDetailsState;
}

export const reducers = {
  gameSellers: fromGameSellers.reducer
};

```
### 12. Now we are going to register this in `game-details.module.ts`

```diff
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SellerDetailsComponent } from './seller-details/seller-details.component';
import { GameSellersComponent } from './game-sellers/game-sellers.component';
import { CreateGameComponent } from './create-game/create-game.component';
import { GameDetailsRoutingModule } from './game-details-routing.module';

+import { StoreModule } from '@ngrx/store';
+import { reducers } from './reducers';

@NgModule({
  imports: [
    CommonModule,
    GameDetailsRoutingModule,
+   StoreModule.forFeature('gameDetails', reducers)
  ],
  declarations: [
    SellerDetailsComponent,
    GameSellersComponent,
    CreateGameComponent
  ]
})
export class GameDetailsModule { }

```
### 13. Now we are going to connect to `game-sellers.component`

```typescript
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { State } from '../reducers';
import * as gameSellers from '../actions/game-sellers.actions';

@Component({
  selector: 'app-game-sellers',
  templateUrl: './game-sellers.component.html'
})
export class GameSellersComponent implements OnInit {
  sellers = [
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
  // TODO: Listen to navigation params
  constructor(
    private route: ActivatedRoute,
    private store: Store<State>
  ) {
    this.store.select('gameDetails')
      .subscribe((result) => console.log(result));
  }

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    this.store.dispatch(new gameSellers.LoadGameSellers(id));
  }
}

```
* Run the application and the developer tools. 

### 14. Now we can take our data from store.

```diff
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { State } from '../reducers';
import * as gameSellers from '../actions/game-sellers.actions';
import { GameSeller } from '../models/game-seller.model';

@Component({
  selector: 'app-game-sellers',
  templateUrl: './game-sellers.component.html'
})
export class GameSellersComponent implements OnInit {
- sellers = [
-   {
-     gameName: 'Super Mario',
-     name: 'Old Shop',
-     amount: 2,
-     price: 75.4
-   },
-   {
-     gameName: 'Super Mario',
-     name: 'New Shop',
-     amount: 1,
-     price: 75.4
-   },
-   {
-     gameName: 'Super Mario',
-     name: 'Regular Shop',
-     amount: 0,
-     price: 55.5
-   },
- ];
+  sellers: GameSeller[];
  // TODO: Listen to navigation params
  constructor(
    private route: ActivatedRoute,
    private store: Store<State>
  ) {
    this.store.select('gameDetails')
      .subscribe(
-       (result) => console.log(result)
+        (gameDetails) => {
+          this.sellers = gameDetails.gameSellers.gameSellers;
+        }
      );
  }

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    this.store.dispatch(new gameSellers.LoadGameSellers(id));
  }
}

```

### 15. Now we are going to connect our last module, `sellers` to `ngrx/store`. Remind that this module it's loded laizily 

* Create `src/sellers/models/seller.model.ts`

```typescript seller.model.ts
export interface Seller {
  name: string;
}
```

* Create `src/sellers/actions/sellers.actions.ts`

```typescript sellers.actions.ts
import { Action } from '@ngrx/store';

export const LOAD_SELLERS = 'LOAD_SELLERS';

export class LoadSellers implements Action {
  readonly type = LOAD_SELLERS;
}

export type Action = LoadSellers;

```
* Create `src/sellers/reducers/sellers.reducer.ts`

```typescript sellers.reducer.ts
import * as sellers from '../actions/sellers.actions';
import { Seller } from '../models/seller.model';

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

export function reducer(state = initialState, action: sellers.Action): State {
  switch (action.type) {
    case sellers.LOAD_SELLERS:
      return {
        ...state,
        sellers: [...SELLERS]
      };
    default:
      return state;
  }
}

```
* Create `src/sellers/reducers/index.ts`

```typescript index.ts
import * as fromSellers from './sellers.reducer';

export interface SellersState {
  sellers: fromSellers.State;
}

export interface State {
  'sellers': SellersState;
}

export const reducers = {
  sellers: fromSellers.reducer
};

```
### 16. Now we are going to register this in `sellers.module.ts`

```diff
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SellerSummaryComponent } from './seller-summary/seller-summary.component';
import { SellerListComponent } from './seller-list/seller-list.component';
import { SellersRoutingModule } from './sellers-routing.module';

+import { StoreModule } from '@ngrx/store';
+import { reducers } from './reducers';

@NgModule({
  imports: [
    CommonModule,
    SellersRoutingModule,
+    StoreModule.forFeature('sellers', reducers)
  ],
  declarations: [
    SellerSummaryComponent,
    SellerListComponent
  ]
})
export class SellersModule { }

```
### 17. Now we are going to connect to `seller-list.component`

```typescript
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { State } from '../reducers';
import * as sellers from '../actions/sellers.actions';

@Component({
  selector: 'app-seller-list',
  templateUrl: './seller-list.component.html'
})
export class SellerListComponent implements OnInit {
  sellers = [
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

  constructor(private store: Store<State>) {
    this.store.select('sellers')
      .subscribe((result) => console.log(result));
  }

  ngOnInit(): void {
    this.store.dispatch(new sellers.LoadSellers());
  }
}

```
* Run the application and watch developer tools.

### 18. Now we can take our data from store.

```diff seller-list.component.ts
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { State } from '../reducers';
import * as sellers from '../actions/sellers.actions';
+import { Seller } from '../models/seller.model';

@Component({
  selector: 'app-seller-list',
  templateUrl: './seller-list.component.html'
})
export class SellerListComponent implements OnInit {
-  sellers = [
-    {
-      name: 'Old Shop'
-    },
-    {
-      name: 'New Shop'
-    },
-    {
-      name: 'Regular Shop'
-    },
-  ];
  sellers: Seller[];
  constructor(private store: Store<State>) {
    this.store.select('sellers')
-   .subscribe((result) => console.log(result));
+   .subscribe((result) => this.sellers = result.sellers.sellers);
  }

  ngOnInit(): void {
    this.store.dispatch(new sellers.LoadSellers());
  }
}

```

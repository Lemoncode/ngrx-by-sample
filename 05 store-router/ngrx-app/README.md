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

## In this demo we are going to add `ngrx/store-devtools`

* For this demo we need to previously get installed the redux dev tools extension for Chrome

## Steps

### 1. First we are going to add a serializer for the applications routes.

* Create `app/shared/utils.ts`

```typescript
import { RouterStateSerializer } from '@ngrx/router-store';
import { RouterStateSnapshot, Params } from '@angular/router';

export interface RouterStateUrl {
  url: string;
  queryParams: Params;
}

export class CustomStateStateSerializer implements RouterStateSerializer<RouterStateUrl> {
  serialize(routerState: RouterStateSnapshot): RouterStateUrl {
    const { url } = routerState;
    const queryParams = routerState.root.queryParams;

    return { url, queryParams };
  }
}

```
### 2. Now we can change `app/reducers/index.ts`

```diff
- import {ActionReducerMap} from '@ngrx/store';
+import {
+  ActionReducerMap,
+  ActionReducer,
+  MetaReducer
+} from '@ngrx/store';
+import { environment } from '../../environments/environment';
+import { RouterStateUrl } from '../shared/utils';
+import * as fromRouter from '@ngrx/router-store';
import * as games from '../games/reducers/games.reducer';

export interface State {
  games: games.State;
+  routerReducer: fromRouter.RouterReducerState<RouterStateUrl>;
};

export const reducers: ActionReducerMap<State> = {
  games: games.reducer,
+  routerReducer: fromRouter.routerReducer
};

+export function logger(reducer: ActionReducer<State>): ActionReducer<State> {
+  return function (state: State, action: any): State {
+    console.log(`State: ${state}; Action: ${action}`);
+
+    return reducer(state, action);
+  };
+}

+export const metaReducers: MetaReducer<State>[] = !environment.production ?
+  [logger] : [];
+
```
### 3. Now we can update `app.module.ts`

```diff
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
+import {
+  StoreRouterConnectingModule,
+  RouterStateSerializer
+} from '@ngrx/router-store';
-import { reducers } from './reducers';
+import { reducers, metaReducers } from './reducers';
+import { CustomStateStateSerializer } from './shared/utils';


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
-   StoreModule.forRoot(reducers),
+    StoreModule.forRoot(reducers, {metaReducers}),
+    StoreRouterConnectingModule,
    StoreDevtoolsModule.instrument()
  ],
  providers: [
+    { provide: RouterStateSerializer, useClass: CustomStateStateSerializer }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

```
## NOTES:

* Allows us to bind the representation of the route on the browser, route state into the ngrx store. This give us more power  when we compose selectors.

```typescript
import  * as fromRouter from '@ngrx/router-store';
import { Params } from '@angular/router';
import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';

export interface RouterStateUrl {
  url: string;
  queryParams: Params;
  params: Params;
}

/*
 RouterReducerState, this one accepts a generic type, so  we can type it as RouterStateUrl
*/

export interface State {
  routerReducer: fromRouter.RouterReducerState<RouterStateUrl>
}

/*
  To type these reducers we use ActionReducerMap, add safety chcking type
*/
export const reducers: ActionReducerMap<State> = {
  routerReducer: fromRouter.RouterReducerState
};

// Creating our selector
// We don't have to write this line: fromRouter.RouterReducerState<RouterStateUrl>
// we put it just for checking the type.
export const getRouterState = createFeatureSelector<
  fromRouter.RouterReducerState<RouterStateUrl>
>('routerReducer')
```

* We have to add a function that it's called the router state serializer
* This function will `map` the `router snapshot` to our state.

```typescript
import  * as fromRouter from '@ngrx/router-store';
import {
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Params
} from '@angular/router';
import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';

export interface RouterStateUrl {
  url: string;
  queryParams: Params;
  params: Params;
}

export interface State {
  routerReducer: fromRouter.RouterReducerState<RouterStateUrl>
}

export const reducers: ActionReducerMap<State> = {
  routerReducer: fromRouter.RouterReducerState
};

export const getRouterState = createFeatureSelector<
  fromRouter.RouterReducerState<RouterStateUrl>
>('routerReducer')

/*
 What we are going to return is RouterStateUrl. What we rae going to do is to compose a new object
 based on the properties of the router. Any time we navigate, or change the url by code or in the 
 browser, this function will be called.
*/
export class CustomSerializer 
  implements fromRouter.RouterStateSerializer<RouterStateUrl> {
  serialize(routerState: RouterStateSnapshot): RouterStateUrl {
    const { url } = routerState;
    const { queryParams } = routerState.root;
    /*
      To retrieve params we have to iterate over the ActivatedRouteSnapshot. It's the angular router
    */
    let state: ActivatedRouteSnapshot = routerState.root;
    while(state.firstChild) {
      state = state.firstChild;
    }

    const { params } = state;

    return { url, queryParms, params  }; // This the object that will be bound to the router state tree.
  }
}


```
* Then we can jump to our `app.module.ts` and plug everything that we need.
* After plug everything together we can watch on redux dev tools how is this working.


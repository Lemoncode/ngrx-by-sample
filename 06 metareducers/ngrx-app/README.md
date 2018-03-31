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

## In this demo we are going to add a logger to our app. This is going to be a `metareducer`. This is just a thunk, that it's going to log, so our reducers still do not manage side effects.

* 

## Steps

### 1. Lets create a `thunk` that will handle the logging in our application.

* Open `app/reducers/index.ts` and edit as follows.

```diff
-import { ActionReducerMap } from '@ngrx/store';
+import { 
+    ActionReducerMap, 
+    ActionReducer,
+    MetaReducer
+} from '@ngrx/store';
import { RouterStateUrl } from '../shared/utils';
import * as games from '../games/reducers/games.reducers';
import * as fromRouter from '@ngrx/router-store';
+import { environment } from '../../environments/environment';

export interface State {
    games: games.State,
    routerReducer: fromRouter.RouterReducerState<RouterStateUrl>
};

export const reducers: ActionReducerMap<State> = {
    games: games.reducer,
    routerReducer: fromRouter.routerReducer
};

+export const logger = (reducer: ActionReducer<State>): ActionReducer<State> => {
+    return (state: State, action: any): State => {
+        console.log(`State: ${state}, Action: ${action}`);
+        return reducer(state, action);
+    };
+}

+export const metaReducers: MetaReducer<State>[] = !environment.production ? 
+    [logger] : [];
```

### 2. Now we have to rgister the meta reducers to work on our solution.

* Open `app.module.ts`

```diff
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import {
  StoreRouterConnectingModule,
  RouterStateSerializer
} from '@ngrx/router-store';
-import { reducers } from './reducers';
+import { reducers, metaReducers } from './reducers';
import { CustomSerializer } from './shared/utils';

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
    GameDetailsModule,
    AppRoutingModule,
-    StoreModule.forRoot(reducers),
+    StoreModule.forRoot(reducers, {metaReducers}),
    StoreRouterConnectingModule,
    StoreDevtoolsModule.instrument()
  ],
  providers: [
    { provide: RouterStateSerializer, useClass: CustomSerializer }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

```
* Now we can run the application and watch that all the accions are register into the developer tools console.
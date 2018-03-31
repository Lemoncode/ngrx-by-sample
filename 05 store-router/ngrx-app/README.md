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

## In this demo we are going to add `ngrx/store-router`

* `store-router` allows us to bind the representation of the route (the browser url), to the route state on the ngrx store. This give us more power when we compose selctors.

## Steps

### 1. First we are going to add a serializer for the applications routes.

* Create `app/shared/utils.ts`

```typescript
import { Params } from '@angular/router';

export interface RouterStateUrl {
    url: string;
    queryParams: Params;
    params: Params;
}
```

### 2. We are going to modify our top reducers, `src/app/reducers/index.ts`, adding a new reducer that it's provided by `ngrx/router-store`, which generic type will be the one previously created.

```diff
import { ActionReducerMap } from '@ngrx/store';
+ import { RouterStateUrl } from '../shared/utils';
import * as games from '../games/reducers/games.reducers';
+ import * as fromRouter from '@ngrx/router-store';


export interface State {
    games: games.State
+   routerReducer: fromRouter.RouterReducerState<RouterStateUrl>
};

export const reducers: ActionReducerMap<State> = {
    games: games.reducer
+   routerReducer: fromRouter.routerReducer 
};
```

* `RouterReducerState`, this one accepts a generic type, so  we can type it as `RouterStateUrl`

### 3. First we are going to add a serializer for the applications routes. We need this serializer in order to bind the router with our state.

* Open `app/shared/utils.ts` and modify as follows.

```diff
-import { Params } from '@angular/router';
+import { Params, RouterStateSnapshot } from '@angular/router';
+import { RouterStateSerializer } from '@ngrx/router-store';

export interface RouterStateUrl {
    url: string;
    queryParams: Params;
    params: Params;
} 

+export class CustomSerializer implements RouterStateSerializer<RouterStateUrl> {
+    serialize(routerState: RouterStateSnapshot): RouterStateUrl {
+        
+    }
+}
```
### 4. Now lets implement the `serialize` method.

```diff
-import { Params, RouterStateSnapshot } from '@angular/router';
+import { Params, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { RouterStateSerializer } from '@ngrx/router-store';

export interface RouterStateUrl {
    url: string;
    queryParams: Params;
    params: Params;
}

export class CustomSerializer implements RouterStateSerializer<RouterStateUrl> {
    serialize(routerState: RouterStateSnapshot): RouterStateUrl {
+        const { url } = routerState;
+        const { queryParams } = routerState.root;
+
+        let state: ActivatedRouteSnapshot = routerState.root;
+        while (state.firstChild) {
+            state = state.firstChild;
+        }
+
+        const { params } = state;
+        return {
+            url,
+            queryParams,
+            params
+        };
    }
}
```

### 5. Now we can update `app.module.ts`

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
import { reducers } from './reducers';
+import { CustomSerializer } from './shared/utils';


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
    StoreModule.forRoot(reducers),
+    StoreRouterConnectingModule,
    StoreDevtoolsModule.instrument()
  ],
  providers: [
+    { provide: RouterStateSerializer, useClass: CustomSerializer }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

```
* Open the redux dev tools on the browser and watch that a new slice on the state has been added.

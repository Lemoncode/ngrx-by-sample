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

* For this demo we need to previously get installed the [redux dev tools extension for Chrome](https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd?hl=es)

## Steps

### 1. First of all we have to install `ngrx/store-devtools`

```bash
$ npm i @ngrx/store-devtools@4.1.1 -D
```

```bash
$ npm i typescript@2.6.1 -D
```
### 2. Now we can modify the `app.module.ts` 

```diff
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { StoreModule } from '@ngrx/store';
+import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { reducers } from './reducers';


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
+    StoreDevtoolsModule.instrument()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

```

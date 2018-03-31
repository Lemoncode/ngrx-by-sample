# NgrxApp

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.7.3.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).


## In this demo we are going to create a routing module for our application

## Steps

### 1. Create a new folder `app/games`

* `game-summary.component.*`
* `game-list.component.*`
* `game-stock.service.*`

* Create a new component `app/games/game-summary.component.*`

```bash
$ ng generate component game-summary
```
* Remove `.css` and `.spec.ts`, related files.

```typescript game-summary.component
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-game-summary',
  templateUrl: './game-summary.component.html'
})
export class GameSummaryComponent {
  @Input() game; // TODO: Define type
}
```
```html game-summary.component
<h2>{{game.name}}</h2>
```

* Create a new component `app/games/game-list.component.*`

```bash
$ ng generate component game-list
```

```typescript game-list.component
import { Component, OnInit } from '@angular/core';

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
  constructor() { }

  ngOnInit() {
  }
}
```
```html game-list.component
<app-game-summary [game]="game" *ngFor="let game of games">
</app-game-summary>
```

* Remove `.css` and `.spec.ts`, related files.

### 2. Now with this on place we are going to create a new `module` for routing. This routing module it's related with `app.module.ts`

* Move the relative folder on bash to `src/app`

```bash
$ ng generate module app-routing
```
* The `angular CLI`, will create a new folder for this module. Move the created file to `src/app`

```diff app-routing.module.ts
import { NgModule } from '@angular/core';
-import { CommonModule } from '@angular/common';
+import { Routes, RouterModule } from '@angular/router';
+
+const routes: Routes = [];

@NgModule({
-  imports: [
-    CommonModule
-  ],
-  declarations: []
+  imports: [RouterModule.forRoot(routes)],
+  exports: [RouterModule],
})
export class AppRoutingModule { }
```
### 3. Now we are going to modify `app.component.*` so we can use the `router-outlet`.

```diff app.component.ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
-  title = 'app works!';
}
```

```css app.component.css
ul {
    padding: 0;
    list-style: none;
}

.navbar {
    display: flex;
    align-items: center;
    border: 1px solid rgba(238,238,238 ,1);
    border-radius: 3px;
    background-color: lightgrey
}

.navbar__item {
    padding-left: 0.5rem;
    padding-right: 0.5rem;
    font-size: 2rem;
}

.navbar__logo {
    margin-left: auto;
    margin-right: auto;
}

.navbar__logo img {
    max-width: 3.5rem;
}
```

```diff app.component.html
-<h1>
-  {{title}}
-</h1>
+<ul class="navbar">
+  <li class="navbar__item">
+    games
+  </li>
+  <li class="navbar__item">
+    sellers
+  </li>
+  <li class="navbar__logo">
+    <img src="assets/ngrx.svg"/>
+  </li>
+  <li class="navbar__item">
+    log in
+  </li>
+</ul>
+<router-outlet></router-outlet>
+
```
### 4. Now we are going to add the basic routes for our application.

```diff
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
+import { GameListComponent } from './games/game-list/game-list.component';

-const routes: Routes = [];
+const routes: Routes = [
+  { path: '', pathMatch: 'full', redirectTo: '/games' },
+  { path: 'games', component: GameListComponent }
+];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

```
### 5. Now it's time to change `app.module.ts` so we can consume our new created `app-routing.module`

```diff app.module.ts
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { GameSummaryComponent } from './games/game-summary/game-summary.component';
import { GameListComponent } from './games/game-list/game-list.component';

+import { AppRoutingModule } from './app-routing.module';

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
+    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

```
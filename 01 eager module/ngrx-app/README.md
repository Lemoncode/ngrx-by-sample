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

## Steps

### 1. Create a new module at `src` level.

```bash
$ ng generate module game-details
```
* This `feature module` will contain the following components:
  * `game-sellers.component.*`
  * `seller-details.component.*` 
  * `create-game.component.*`

### 2. Create a new component at `src/game-details`

```bash
$ ng generate component seller-details
```
* Remove `.css` and `.spec.ts` files.
* Check that component it's created in GameDetailsModule

```typescript GameDetailsModule.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SellerDetailsComponent } from './seller-details/seller-details.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    SellerDetailsComponent
  ]
})
export class GameDetailsModule { }
```


```diff seller-details.component
-import { Component, OnInit } from '@angular/core';
+import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-seller-details',
  templateUrl: './seller-details.component.html',
-  styleUrls: ['./seller-details.component.css']
})
-export class SellerDetailsComponent implements OnInit {
+export class SellerDetailsComponent {  
-  constructor() { }

-  ngOnInit() {
-  }
+ @Input() name: string;
+ @Input() amount: number;
+ @Input() price: number;
+ @Input() gameName: string;
}
```

```html seller-details.component
<div>
  <h1>{{gameName}}</h1>
  <h2>{{name}}</h2>
  <h4>{{amount}}</h4>
  <h4>{{price}}</h4>
</div>
```
### 3. Create a new at `src/game-details`

```bash
$ ng generate component game-sellers
```

* Remove `.css` and `.spec.ts` files.
* Check that component it's created in GameDetailsModule

```diff game-details.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SellerDetailsComponent } from './seller-details/seller-details.component';
+import { GameSellersComponent } from './game-sellers/game-sellers.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    SellerDetailsComponent,
+    GameSellersComponent
  ]
})
export class GameDetailsModule { }
```

```diff game-sellers.component.ts
-import { Component, OnInit } from '@angular/core';
+import { Component } from '@angular/core';

@Component({
  selector: 'app-game-sellers',
  templateUrl: './game-sellers.component.html',
-  styleUrls: ['./game-sellers.component.css']
})
-export class GameSellersComponent implements OnInit {
+export class GameSellersComponent {

-  constructor() { }

-  ngOnInit() {
-  }
+sellers = [
+    {
+      gameName: 'Super Mario',
+      name: 'Old Shop',
+      amount: 2,
+      price: 75.4
+    },
+    {
+      gameName: 'Super Mario',
+      name: 'New Shop',
+      amount: 1,
+      price: 75.4
+    },
+    {
+      gameName: 'Super Mario',
+      name: 'Regular Shop',
+      amount: 0,
+      price: 55.5
+    },
+  ];
+
}

```
```html game-sellers.component.ts
<app-seller-details
  *ngFor="let seller of sellers"
  [gameName]="seller.gameName"
  [name]="seller.name"
  [amount]="seller.amount"
  [price]="seller.price"
></app-seller-details>
```
### 4. Create a new at `src/game-details`

```bash
$ ng g component create-game
```

* Remove `.css` and `.spec.ts` files.
* Check that component it's created in GameDetailsModule

```diff game-details.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SellerDetailsComponent } from './seller-details/seller-details.component';
import { GameSellersComponent } from './game-sellers/game-sellers.component';
+import { CreateGameComponent } from './create-game/create-game.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    SellerDetailsComponent,
    GameSellersComponent,
+    CreateGameComponent
  ]
})
export class GameDetailsModule { }

```
### 5. Now with all these components on place it's time generate `src/game-details/game-details-routing.module.ts`

```typescript
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GameSellersComponent } from './game-sellers/game-sellers.component';
import { CreateGameComponent } from './create-game/create-game.component';

const routes: Routes = [
  { path: 'games/new', component: CreateGameComponent },
  { path: 'games/:id', component: GameSellersComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GameDetailsRoutingModule {}


```
```diff game-details.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SellerDetailsComponent } from './seller-details/seller-details.component';
import { GameSellersComponent } from './game-sellers/game-sellers.component';
import { CreateGameComponent } from './create-game/create-game.component';
+import { GameDetailsRoutingModule } from './game-details-routing.module';

@NgModule({
  imports: [
    CommonModule,
+    GameDetailsRoutingModule
  ],
  declarations: [
    SellerDetailsComponent,
    GameSellersComponent,
    CreateGameComponent
  ]
})
export class GameDetailsModule { }

```

### 6. To get this module loaded eagerly, we have to register it on AppModule

```diff app.module.ts
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { GameSummaryComponent } from './games/game-summary/game-summary.component';
import { GameListComponent } from './games/game-list/game-list.component';

import { AppRoutingModule } from './app-routing.module';
+import { GameDetailsModule } from '../game-details/game-details.module';

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
+    GameDetailsModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

```
* Run application and try the new created routes.

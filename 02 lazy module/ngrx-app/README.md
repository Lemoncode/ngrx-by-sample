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

## In this demo we are going to create a lazy module.

## Steps

### 1. Create a new module at `src/app` level.

```bash
$ ng generate module sellers
```

### 2. Generate a new component `seller-summary` at `src/app/sellers`

```bash
$ ng g component seller-summary
```
* Remove `.css` and `.spec.ts` files

```diff sellers.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
+import { SellerSummaryComponent } from './seller-summary/seller-summary.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
+    SellerSummaryComponent
  ]
})
export class SellersModule { }

```

```diff seller-summary.component.ts
-import { Component, OnInit } from '@angular/core';
+import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-seller-summary',
  templateUrl: './seller-summary.component.html',
-  styleUrls: ['./seller-summary.component.css']
})
-export class SellerSummaryComponent implements OnInit {
+export class SellerSummaryComponent {  
-
-  constructor() { }
-
-  ngOnInit() {
-  }
+  @Input() name: string;
}

```
```html seller-summary.component.html
<p>
  {{name}}
</p>
```
### 3. Generate a new component seller-list

```bash
$ ng g component seller-list
```
* Remove `.css` and `.spec.ts` files

```diff sellers.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SellerSummaryComponent } from './seller-summary/seller-summary.component';
+import { SellerListComponent } from './seller-list/seller-list.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    SellerSummaryComponent,
+    SellerListComponent
  ]
})
export class SellersModule { }

```

```diff seller-list.component.ts
-import { Component, OnInit } from '@angular/core';
+import { Component } from '@angular/core';

@Component({
  selector: 'app-seller-list',
  templateUrl: './seller-list.component.html',
-  styleUrls: ['./seller-list.component.css']
})
-export class SellerListComponent implements OnInit {
+export class SellerListComponent {  
-
-  constructor() { }
-
-  ngOnInit() {
-  }
-
+ sellers = [
+    {
+      name: 'Old Shop'
+    },
+    {
+      name: 'New Shop'
+    },
+    {
+      name: 'Regular Shop'
+    },
+  ];
}

```
```html seller-list.component.html
<app-seller-summary
  *ngFor="let seller of sellers"
  [name]="seller.name"
></app-seller-summary>

```

### 4. Now we are going to create a new module for the routes of `sellers.module.ts`

* Create a new file `sellers-routing.module.ts` in `src/app/sellers` 

```typescript sellers-routing.module.ts
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SellerListComponent } from './seller-list/seller-list.component';

const routes: Routes = [
  { path: '', component: SellerListComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SellersRoutingModule { }

```

```diff sellers.module.ts 
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SellerSummaryComponent } from './seller-summary/seller-summary.component';
import { SellerListComponent } from './seller-list/seller-list.component';
+import { SellersRoutingModule } from './sellers-routing.module';

@NgModule({
  imports: [
    CommonModule,
+    SellersRoutingModule
  ],
  declarations: [
    SellerSummaryComponent,
    SellerListComponent
  ]
})
export class SellersModule { }

```
### 5. For last we have to upadate our `app-routing.module.ts`, so it can notice that has to load the new lazy module created.


```diff app-routing.module.ts
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GameListComponent } from './games/game-list/game-list.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/games' },
  { path: 'games', component: GameListComponent },
+  { path: 'sellers', loadChildren: '../sellers/sellers.module#SellersModule' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

```
* Notice that we don't change anything on the `app.module.ts` file.
* Run the application

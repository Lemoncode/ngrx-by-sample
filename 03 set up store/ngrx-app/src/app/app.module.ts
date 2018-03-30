import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { StoreModule } from '@ngrx/store';
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
    GameDetailsModule,
    AppRoutingModule,
    StoreModule.forRoot(reducers)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

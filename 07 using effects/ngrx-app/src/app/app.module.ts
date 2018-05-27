import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import {
  StoreRouterConnectingModule,
  RouterStateSerializer
} from '@ngrx/router-store';
import { reducers, metaReducers } from './core/store/reducers';
import { CustomSerializer } from './shared/utils';
import { GamesEffects } from './games/store/effects/games.effects';

import { AppComponent } from './app.component';
import { GameSummaryComponent } from './games/components/game-summary/game-summary.component';
import { GameListComponent } from './games/containers/game-list/game-list.component';

import { AppRoutingModule } from './app-routing.module';
import { GameDetailsModule } from './game-details/game-details.module'; // TODO: 

// import { GamesService } from './games/games.services'; //  TODO: Move to core.
import { CoreModule } from './core/core.module';

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
    StoreModule.forRoot(reducers, {metaReducers}),
    StoreRouterConnectingModule,
    StoreDevtoolsModule.instrument(),
    EffectsModule.forRoot([GamesEffects]),
    CoreModule.foorRoot()
  ],
  providers: [
    { provide: RouterStateSerializer, useClass: CustomSerializer },
    // GamesService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

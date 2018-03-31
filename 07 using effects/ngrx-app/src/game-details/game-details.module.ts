import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SellerDetailsComponent } from './seller-details/seller-details.component';
import { GameSellersComponent } from './game-sellers/game-sellers.component';
import { CreateGameComponent } from './create-game/create-game.component';
import { GameDetailsRoutingModule } from './game-details-routing.module';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { reducers } from './reducers';
import { GameSellersService } from './game-sellers.service';
import { GameSellersEffects } from './effects/game-sellers.effects';

@NgModule({
  imports: [
    CommonModule,
    GameDetailsRoutingModule,
    StoreModule.forFeature('gameDetails', reducers),
    EffectsModule.forFeature([GameSellersEffects]),
  ],
  declarations: [
    SellerDetailsComponent,
    GameSellersComponent,
    CreateGameComponent
  ],
  providers: [
    GameSellersService
  ]
})
export class GameDetailsModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common'; // TODO: Move to core.
import { SellerDetailsComponent } from './components/seller-details/seller-details.component';
import { GameSellersComponent } from './containers/game-sellers/game-sellers.component';
import { CreateGameComponent } from './components/create-game/create-game.component';
import { GameDetailsRoutingModule } from './game-details-routing.module';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { reducers } from './store/reducers';
import { GameSellersService } from './services/game-sellers.service'; // From core.
import { GameSellersEffects } from './store/effects/game-sellers.effects';

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

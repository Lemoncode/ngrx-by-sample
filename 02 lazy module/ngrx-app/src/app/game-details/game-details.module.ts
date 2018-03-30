import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SellerDetailsComponent } from './seller-details/seller-details.component';
import { GameSellersComponent } from './game-sellers/game-sellers.component';
import { CreateGameComponent } from './create-game/create-game.component';
import { GameDetailsRoutingModule } from './game-details-routing.module';

@NgModule({
  imports: [
    CommonModule,
    GameDetailsRoutingModule
  ],
  declarations: [SellerDetailsComponent, GameSellersComponent, CreateGameComponent]
})
export class GameDetailsModule { }

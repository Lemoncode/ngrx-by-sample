import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateGameComponent } from './create-game/create-game.component';
import { GameSellersComponent } from './game-sellers/game-sellers.component';

const routes: Routes = [
    { path: 'games/new', component: CreateGameComponent },
    { path: 'games/:id', component: GameSellersComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class GameDetailsRoutingModule {}
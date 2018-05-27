import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateGameComponent } from './components/create-game/create-game.component';
import { GameSellersComponent } from './containers/game-sellers/game-sellers.component';

const routes: Routes = [
    { path: 'games/new', component: CreateGameComponent }, // details/new
    { path: 'games/:id', component: GameSellersComponent } // details/:id
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class GameDetailsRoutingModule {}
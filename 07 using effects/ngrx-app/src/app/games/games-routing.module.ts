import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GameListComponent } from '../games/containers/game-list/game-list.component';

const routes: Routes = [
    { path: 'games', component: GameListComponent }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [RouterModule]
})
export class GamesRoutingModule {}
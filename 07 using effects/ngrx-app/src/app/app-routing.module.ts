import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GameListComponent } from './games/containers/game-list/game-list.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/games' },
  { path: 'games', component: GameListComponent }, // Move out to its own routing module
  { path: 'sellers', loadChildren: './sellers/sellers.module#SellersModule' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }

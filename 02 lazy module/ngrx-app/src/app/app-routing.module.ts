import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GameListComponent } from './games/game-list/game-list.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/games' },
  { path: 'games', component: GameListComponent },
  { path: 'sellers', loadChildren: '../sellers/sellers.module#SellersModule' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }

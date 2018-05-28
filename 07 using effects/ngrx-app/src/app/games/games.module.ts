import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common'; // TODO: Move to core.
import { StoreModule } from '@ngrx/store';

import { CoreModule } from '../core/core.module';
import { GameSummaryComponent } from './components/game-summary/game-summary.component';
import { GameListComponent } from './containers/game-list/game-list.component';
import { GamesRoutingModule } from './games-routing.module';

// TODO: Create reducers
// TODO: Register StoreModule

@NgModule({
    imports: [
        CommonModule,
        CoreModule,
        GamesRoutingModule
    ],
    declarations: [
        GameSummaryComponent,
        GameListComponent
    ]
})
export class GamesModule { }

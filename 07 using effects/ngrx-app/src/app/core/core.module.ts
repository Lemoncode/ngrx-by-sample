import { NgModule } from '@angular/core';
// TODO: Import CommonModule
// TODO: Add to core: main navigation bar, transversal services

import { GamesService } from './services/games.services';

@NgModule({})
export class CoreModule {
    static foorRoot() {
        return {
            ngModule: CoreModule,
            providers: [GamesService]
        }
    }
}

/*
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { ToolbarComponent } from './components/toolbar';
import { MaterialModule } from '../material';

import { GoogleBooksService } from './services/google-books';

export const COMPONENTS = [
  AppComponent,
  NotFoundPageComponent,
  LayoutComponent,
  NavItemComponent,
  SidenavComponent,
  ToolbarComponent,
];

@NgModule({
  imports: [CommonModule, RouterModule, MaterialModule],
  declarations: COMPONENTS,
  exports: COMPONENTS,
})
export class CoreModule {
  static forRoot() {
    return {
      ngModule: CoreModule,
      providers: [GoogleBooksService],
    };
  }
}
*/
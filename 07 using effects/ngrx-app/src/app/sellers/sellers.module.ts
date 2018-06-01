import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common'; // TODO: Move to core.
import { StoreModule } from '@ngrx/store';

import { SellerSummaryComponent } from './components/seller-summary/seller-summary.component';
import { SellerListComponent } from './containers/seller-list/seller-list.component';
import { SellersRoutingModule } from './sellers-routing.module';
import { CoreModule } from '../core/core.module';

import { reducers } from './store/reducers';

@NgModule({
  imports: [
    CommonModule,
    SellersRoutingModule,
    CoreModule,
    StoreModule.forFeature('sellers', reducers)
  ],
  declarations: [
    SellerSummaryComponent,
    SellerListComponent
  ]
})
export class SellersModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SellerSummaryComponent } from './seller-summary/seller-summary.component';
import { SellerListComponent } from './seller-list/seller-list.component';
import { SellersRoutingModule } from './sellers-routing.module';

import { StoreModule } from '@ngrx/store';
import { reducers } from './reducers';

@NgModule({
  imports: [
    CommonModule,
    SellersRoutingModule,
    StoreModule.forFeature('sellers', reducers)
  ],
  declarations: [
    SellerSummaryComponent,
    SellerListComponent
  ]
})
export class SellersModule { }

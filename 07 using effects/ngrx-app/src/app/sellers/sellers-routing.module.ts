import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SellerListComponent } from './containers/seller-list/seller-list.component';

const routes: Routes = [
    { path: '', component: SellerListComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class SellersRoutingModule {}
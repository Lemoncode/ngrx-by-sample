import { Component } from '@angular/core';

@Component({
  selector: 'app-seller-list',
  templateUrl: './seller-list.component.html'
})
export class SellerListComponent {
  sellers = [
    {
      name: 'Old Shop',
    },
    {
      name: 'New Shop',
    },
    {
      name: 'Regular Shop',
    },
  ];
}

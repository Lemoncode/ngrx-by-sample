import { Component } from '@angular/core'

@Component({
  selector: 'app-game-sellers',
  templateUrl: './game-sellers.component.html'
})
export class GameSellersComponent {
  sellers = [
    {
      gameName: 'Super Mario',
      name: 'Old Shop',
      amount: 2,
      price: 75.4
    },
    {
      gameName: 'Super Mario',
      name: 'New Shop',
      amount: 1,
      price: 75.4
    },
    {
      gameName: 'Super Mario',
      name: 'Regular Shop',
      amount: 2,
      price: 55.5
    }
  ];
}

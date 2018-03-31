import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-seller-details',
  templateUrl: './seller-details.component.html'
})
export class SellerDetailsComponent {
  @Input() name: string;
  @Input() amount: number;
  @Input() price: number;
  @Input() gameName: string;
}

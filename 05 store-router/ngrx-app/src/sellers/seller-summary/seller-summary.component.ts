import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-seller-summary',
  templateUrl: './seller-summary.component.html'
})
export class SellerSummaryComponent {
  @Input() name: string;
}

import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-game-summary',
  templateUrl: './game-summary.component.html'
})
export class GameSummaryComponent {
  @Input() game; // TODO: Define type
}

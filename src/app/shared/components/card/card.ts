import { Component, input, output } from '@angular/core';
import { Button } from '../buttons/button/button';

@Component({
  selector: 'app-card',
  imports: [Button],
  templateUrl: './card.html',
  styleUrl: './card.css',
})
export class Card {
  title = input.required();

  headerButtonText = input();
  footerButtonText = input();

  headerButtonClick = output();
  footerButtonClick = output();

  onHeaderButtonClick() {
    this.headerButtonClick.emit();
  }

  onFooterButtonClick() {
    this.footerButtonClick.emit();
  }
}

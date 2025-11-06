import { Component, output, input } from '@angular/core';
import { Icon } from '../../../icon/icon';

@Component({
  selector: 'app-selection-button',
  imports: [Icon],
  templateUrl: './selection-button.html',
  styleUrl: './selection-button.css',
})
export class SelectionButton {
  placeholder = input<string>('Select an option');
  selectedOption = input<string | null>(null);

  toggle = output();

  toggleOptions() {
    this.toggle.emit();
  }
}

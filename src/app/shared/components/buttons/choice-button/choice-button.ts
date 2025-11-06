import { Component, input, output, signal } from '@angular/core';
import { ChoiceOptions } from './choice-options/choice-options';
import { SelectionButton } from '../select-button/selection-button/selection-button';

@Component({
  selector: 'app-choice-button',
  imports: [ChoiceOptions, SelectionButton],
  templateUrl: './choice-button.html',
  styleUrl: './choice-button.css',
})
export class ChoiceButton {
  placeholder = input<string>('Select an option');
  options =
    input.required<{ type: 'string' | 'number'; options: { key: string; value: string }[] }[]>();
  selectedOption = input<string | null>(null);
  selected = output<{ type: 'string' | 'number'; key: string; value: string }>();

  optionsVisible = signal(false);

  onSelect(option: { type: 'string' | 'number'; option: { key: string; value: string } }) {
    this.selected.emit({type: option.type, key: option.option.key, value: option.option.value});
    this.toggleOptions();
  }

  toggleOptions() {
    this.optionsVisible.update((prev) => !prev);
  }
}

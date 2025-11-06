import { Component, ElementRef, HostListener, inject, input, output, signal } from '@angular/core';
import { ChoiceOptions } from './choice-options/choice-options';
import { SelectionButton } from '../select-button/selection-button/selection-button';

@Component({
  selector: 'app-choice-button',
  imports: [ChoiceOptions, SelectionButton],
  templateUrl: './choice-button.html',
  styleUrl: './choice-button.css',
})
export class ChoiceButton {
  elementRef = inject(ElementRef);

  @HostListener('document:click', ['$event']) clickout(event: Event) {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.optionsVisible.set(false);
    }
  }

  placeholder = input<string>('Select an option');
  options = input.required<{ type: 'string' | 'number'; options: { key: string; value: string }[] }[]>();
  selectedOption = input<string | null>(null);
  initialFilter = input<string | null>(null);

  selected = output<{ type: 'string' | 'number'; key: string; value: string }>();
  typeChanged = output<'string' | 'number'>();

  optionsVisible = signal(false);

  onSelect(option: { type: 'string' | 'number'; option: { key: string; value: string } }) {
    this.selected.emit({ type: option.type, key: option.option.key, value: option.option.value });
    this.toggleOptions();
  }

  onTypeChanged(type: 'string' | 'number') {
    this.typeChanged.emit(type);
  }

  toggleOptions() {
    this.optionsVisible.update((prev) => !prev);
  }
}

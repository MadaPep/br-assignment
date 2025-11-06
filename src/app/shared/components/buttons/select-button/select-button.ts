import {
  Component,
  computed,
  ElementRef,
  HostListener,
  inject,
  input,
  output,
  signal,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Icon } from '../../icon/icon';
import { SelectionButton } from './selection-button/selection-button';
import { FilterOptions } from './filter-options/filter-options';

@Component({
  selector: 'app-select-button',
  imports: [FormsModule, SelectionButton, FilterOptions],
  templateUrl: './select-button.html',
  styleUrl: './select-button.css',
})
export class SelectButton {
  elementRef = inject(ElementRef);

  @HostListener('document:click', ['$event']) clickout(event: Event) {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.optionsVisible.set(false);
    }
  }

  selectedParentOption = input<string | null>(null);
  placeholder = input<string>('Select an option');
  options = input.required<string[]>();
  selectedOption = input<string | null>(null);
  selected = output<string>();

  filter = signal<string>('');
  filteredOptions = computed(() =>
    this.options().filter((option) => option.toLowerCase().includes(this.filter().toLowerCase()))
  );

  optionsVisible = signal(false);

  onSelect(option: string) {
    this.selected.emit(option);
    this.toggleOptions();
  }

  toggleOptions() {
    this.optionsVisible.update((prev) => !prev);
  }
}

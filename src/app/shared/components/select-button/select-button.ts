import { Component, computed, input, output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Icon } from "../icon/icon";

@Component({
  selector: 'app-select-button',
  imports: [FormsModule, Icon],
  templateUrl: './select-button.html',
  styleUrl: './select-button.css',
})
export class SelectButton {
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

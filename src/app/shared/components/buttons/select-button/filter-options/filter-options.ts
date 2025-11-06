import { Component, computed, input, output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-filter-options',
  imports: [FormsModule],
  templateUrl: './filter-options.html',
  styleUrl: './filter-options.css',
})
export class FilterOptions {
  options = input.required<string[]>();
  selectedOption = input<string | null>(null);
  selected = output<string>();

  filter = signal<string>('');
  filteredOptions = computed(() =>
    this.options().filter((option) => option.toLowerCase().includes(this.filter().toLowerCase()))
  );

  onSelect(option: string) {
    this.selected.emit(option);
  }

}

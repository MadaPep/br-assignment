import { Component, computed, input, output, signal } from '@angular/core';
import { Button } from "../../button/button";
import { Icon } from "../../../icon/icon";

@Component({
  selector: 'app-choice-options',
  imports: [Button, Icon],
  templateUrl: './choice-options.html',
  styleUrl: './choice-options.css',
})
export class ChoiceOptions {
  options =
    input.required<{ type: 'string' | 'number'; options: { key: string; value: string }[] }[]>();
  selectedOption = input<string | null>(null);
  initialFilter = input<'string' | 'number'>('string');

  selected = output<{ type: 'string' | 'number'; option: { key: string; value: string } }>();


  filter = signal<'string' | 'number'>(this.initialFilter());
  filteredOptions = computed(() =>
    this.options().find((el) => el.type === this.filter())?.options || []
  );

  onFilterSelected(type: 'string' | 'number') {
    this.filter.set(type);
  }

  onSelect(option: { key: string; value: string }) {
    this.selected.emit({ type: this.filter(), option: option });
  }
}

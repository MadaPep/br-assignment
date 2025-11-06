import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-button',
  imports: [],
  templateUrl: './button.html',
  styleUrl: './button.css',
})
export class Button {
  type = input<'primary' | 'secondary' | 'tertiary' | 'destructive' | 'tab-button'>('primary');
  active= input<boolean>(false);
  click = output();


  onClick(event: Event) {
    event.stopPropagation();
    this.click.emit();
  }
}

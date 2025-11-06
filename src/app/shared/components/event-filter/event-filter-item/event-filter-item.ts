import { BrEvent } from './../../../models/br-event';
import { Component, computed, inject, input, output } from '@angular/core';
import { BrEventFilter } from '../../../models/br-event';
import { Button } from '../../button/button';
import { Icon } from '../../icon/icon';
import { SelectButton } from '../../select-button/select-button';
import { CustomerEvents } from '../../../../services/customer-events';

@Component({
  selector: 'app-event-filter-item',
  imports: [Button, Icon, SelectButton],
  templateUrl: './event-filter-item.html',
  styleUrl: './event-filter-item.css',
})
export class EventFilterItem {
  customerEventsService = inject(CustomerEvents);

  filter = input.required<BrEventFilter>();
  events = this.customerEventsService.allCustomerEvents;

  eventTypes = computed(() => this.events().map((event) => event.type));

  remove = output<BrEventFilter>();
  update = output<BrEventFilter>();

  onStepNameChange(newName: string) {
    this.update.emit({
      ...this.filter(),
      eventName: newName,
    });
  }

  onCopyStep() {
    throw new Error('Method not implemented.');
  }
  onDeleteStep() {
    throw new Error('Method not implemented.');
  }
  onAddNewAttribute() {
    throw new Error('Method not implemented.');
  }

  onEventTypeSelected($event: string) {
    this.update.emit({
      ...this.filter(),
      type: $event,
    });
  }
}

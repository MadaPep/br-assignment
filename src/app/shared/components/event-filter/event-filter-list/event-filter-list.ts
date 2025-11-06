import { Component, input, signal } from '@angular/core';
import { BrEvent, BrEventFilter } from '../../../models/br-event';
import { EventFilterItem } from '../event-filter-item/event-filter-item';

@Component({
  selector: 'app-event-filter-list',
  imports: [EventFilterItem],
  templateUrl: './event-filter-list.html',
  styleUrl: './event-filter-list.css',
})
export class EventFilterList {

  events = input<BrEvent[]>();
  eventFilters = signal<BrEventFilter[]>([{ eventId: 1, eventName: 'Unnamed Step' }]);

  onUpdateFilter($event: BrEventFilter) {
    throw new Error('Method not implemented.');
  }
  onRemoveFilter($event: BrEventFilter) {
    throw new Error('Method not implemented.');
  }
}

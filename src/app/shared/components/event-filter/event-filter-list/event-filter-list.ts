import { Component, input, linkedSignal, output, signal } from '@angular/core';
import { BrEvent, BrEventFilter } from '../../../models/br-event';
import { EventFilterItem } from '../event-filter-item/event-filter-item';
import { Button } from "../../buttons/button/button";

@Component({
  selector: 'app-event-filter-list',
  imports: [EventFilterItem, Button],
  templateUrl: './event-filter-list.html',
  styleUrl: './event-filter-list.css',
})
export class EventFilterList {

  events = input<BrEvent[]>();
  filters = input<BrEventFilter[]>([{ eventId: 1, eventName: 'Unnamed Step' }]);

  change = output<BrEventFilter[]>();

  eventFilters = linkedSignal<BrEventFilter[]>(() => this.filters());

  onUpdateFilter(event: BrEventFilter) {
    this.eventFilters.update((filters) =>
      filters.map((filter) => (filter.eventId === event.eventId ? event : filter))
    );
    this.change.emit(this.eventFilters());
  }

  onAddNewFilter() {
    const newFilter: BrEventFilter = {
      eventId: this.eventFilters().length + 1,
      eventName: 'Unnamed Step',
    };
    this.eventFilters.update((filters) => [...filters, newFilter]);
    this.change.emit(this.eventFilters());
  }

  onCopyFilter(event: BrEventFilter) {
    const copiedFilter: BrEventFilter = {
      ...event,
      eventId: this.eventFilters().length + 1,
    };
    this.eventFilters.update((filters) => [...filters, copiedFilter]);
    this.change.emit(this.eventFilters());
  }

  onRemoveFilter(eventId: number) {
    this.eventFilters.update((filters) =>
      filters.filter((filter) => filter.eventId !== eventId)
    );
    this.change.emit(this.eventFilters());
  }
}

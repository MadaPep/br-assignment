import { CustomerEvents } from './../../services/customer-events';
import { Component, inject, OnInit, signal } from '@angular/core';
import { Card } from '../../shared/components/card/card';
import { EventFilterList } from '../../shared/components/event-filter/event-filter-list/event-filter-list';
import { BrEventFilter, BrEventFilterQuery } from '../../shared/models/br-event';

@Component({
  selector: 'app-home',
  imports: [Card, EventFilterList],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit {
  customerEventsService = inject(CustomerEvents);

  customerEvents = this.customerEventsService.allCustomerEvents;

  filters = signal<BrEventFilter[]>([{ eventId: 1, eventName: 'Unnamed Step' }]);

  ngOnInit(): void {
    this.customerEventsService.getComponents();
  }

  onFiltersChanged(event: BrEventFilter[]) {
    if (!(event instanceof Array)) return;
    this.filters.set(event);
  }

  onApplyFilters() {
    let query: BrEventFilterQuery[] = this.filters()
      .filter((filter) => filter.type && filter.properties?.some((prop) => prop.property))
      .map((filter) => {
        return {
          type: filter.type || '',
          properties:
            filter.properties
              ?.filter((prop) => prop.property)
              .map((prop) => ({
                property: prop.property,
                type: prop.type,
                operator: prop.operator?.key || '',
                value1: prop.value1 || '',
                value2: prop.value2 || '',
              })) || [],
        };
      });

    console.log('Apply filters clicked', query);
  }

  onDiscardFilters() {
    this.filters.set([{ eventId: 1, eventName: 'Unnamed Step' }]);
  }
}

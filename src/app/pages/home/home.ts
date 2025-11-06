import { CustomerEvents } from './../../services/customer-events';
import { Component, inject, OnInit } from '@angular/core';
import { Card } from "../../shared/components/card/card";
import { EventFilterList } from "../../shared/components/event-filter/event-filter-list/event-filter-list";

@Component({
  selector: 'app-home',
  imports: [Card, EventFilterList],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit {
  customerEventsService = inject(CustomerEvents);

  customerEvents = this.customerEventsService.allCustomerEvents;

  ngOnInit(): void {
    this.customerEventsService.getComponents();
  }

  onApplyFilters() {
    console.log('Apply filters clicked');
  }

  onDiscardFilters() {
    console.log('Discard filters clicked');
  }


}

import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { map } from 'rxjs';
import { BrEvent } from '../shared/models/br-event';



@Injectable({
  providedIn: 'root',
})
export class CustomerEvents {
  httpClient = inject(HttpClient);

  customerEvents = signal<BrEvent[]>([]);

  allCustomerEvents = this.customerEvents.asReadonly();

  getComponents() {
    return this.httpClient
      .get<{ events: BrEvent[] }>('https://br-fe-assignment.github.io/customer-events/events.json')
      .pipe(map((response) => response.events))
      .subscribe({
        next: (data) => {
          this.customerEvents.set(data);
        },
      });
  }
}

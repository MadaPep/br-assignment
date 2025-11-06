import { BrEvent, BrEventProperty } from './../../../models/br-event';
import { Component, computed, inject, input, output, signal } from '@angular/core';
import { BrEventFilter } from '../../../models/br-event';
import { Button } from '../../buttons/button/button';
import { Icon } from '../../icon/icon';
import { SelectButton } from '../../buttons/select-button/select-button';
import { CustomerEvents } from '../../../../services/customer-events';
import { NUMBER_OPERATORS, STRING_OPERATORS } from '../../../models/utils';
import { ChoiceButton } from "../../buttons/choice-button/choice-button";

@Component({
  selector: 'app-event-filter-item',
  imports: [Button, Icon, SelectButton, ChoiceButton],
  templateUrl: './event-filter-item.html',
  styleUrl: './event-filter-item.css',
})
export class EventFilterItem {
  customerEventsService = inject(CustomerEvents);

  filter = input.required<BrEventFilter>();
  events = this.customerEventsService.allCustomerEvents;

  eventTypes = computed(() => this.events().map((event) => event.type));
  currentEvent = computed(() => this.events().find((event) => event.type === this.filter().type));

  properties = computed(() => {
    const foundEvent = this.events().find((event) => event.type === this.filter().type);
    if (!foundEvent) {
      return [];
    }
    return foundEvent.properties.map((p) => p.property) || [];
  });

  remove = output<BrEventFilter>();
  update = output<BrEventFilter>();

  onStepNameChange(newName: string) {
    this.update.emit({
      ...this.filter(),
      eventName: newName,
    });
  }

  operatorOptions = signal<{ type: 'string' | 'number'; options: { key: string; value: string }[] }[]>([
    { type: 'string', options: STRING_OPERATORS },
    { type: 'number', options: NUMBER_OPERATORS },
  ]);

  onCopyStep() {
    throw new Error('Method not implemented.');
  }
  onDeleteStep() {
    throw new Error('Method not implemented.');
  }
  onAddNewAttribute() {
    let properties: BrEventProperty[];
    if (!this.filter().properties) {
      properties = [
        {
          propertyId: 0,
          property: '',
          type: '',
          operator: null,
          value1: '',
        },
      ];
    } else {
      properties = [
        ...this.filter().properties!,
        {
          propertyId: this.filter().properties!.length,
          property: '',
          type: '',
          operator: null,
          value1: '',
        },
      ];
    }

    this.update.emit({
      ...this.filter(),
      properties: properties,
    });
  }

  onEventTypeSelected($event: string) {
    this.update.emit({
      ...this.filter(),
      type: $event,
    });
  }

  onPropertySelected($event: string, id: number) {
    const foundProperty = this.currentEvent()!.properties.find((p) => p.property === $event);
    if (!foundProperty) {
      return;
    }

    const properties = this.filter().properties?.map((prop) => {
      if (prop.propertyId === id) {
        return {
          ...prop,
          property: $event,
          type: foundProperty.type,
          operator: {
            type: foundProperty.type,
            key: foundProperty.type === 'string' ? STRING_OPERATORS[0].key : NUMBER_OPERATORS[0].key,
            value: foundProperty.type === 'string' ? STRING_OPERATORS[0].value : NUMBER_OPERATORS[0].value
          },
          value1: prop.type === 'string' ? '' : 0,
        };
      }
      return prop;
    });

    this.update.emit({
      ...this.filter(),
      properties: properties,
    });
  }

  onOperatorSelected(operator: {type: "string" | "number"; key: string; value: string}| null, id: number) {
    const properties = this.filter().properties?.map((prop) => {
      if (prop.propertyId === id) {
        return {
          ...prop,
          operator: operator,
        };
      }
      return prop;
    });

    this.update.emit({
      ...this.filter(),
      properties: properties,
    });
  }

}

export interface BrEvent {
  type: string;
  properties: [
    {
      property: string;
      type: string;
    }
  ];
}

export interface BrEventFilter {
  eventId: number;
  eventName: string;
  type?: string;
  properties?: BrEventProperty[];
}

export interface BrEventProperty {
  propertyId: number;
  property: string;
  type: string;
  operator: { type: string; key: string; value: string } | null;
  value1: string | number;
  value2?: string | number;
}

export interface BrEventFilterQuery {
  type: string;
  properties: BrEventPropertyQuery[];
}

export interface BrEventPropertyQuery {
  property: string;
  type: string;
  operator: string;
  value1: string | number | null;
  value2: string | number | null;
}

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
  properties?: [
    {
      property: string;
      type: string;
      operator: string;
      value1: string | number;
      value2?: string | number;
    }
  ];
}

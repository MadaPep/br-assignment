export const STRING_OPERATORS: { key: string; value: string }[] = [
  { key: 'EQ', value: 'equals' },
  { key: 'NEQ', value: 'not equals' },
  { key: 'CONTAINS', value: 'contains' },
  { key: 'NOT_CONTAINS', value: 'does not contain' },
] as const;
export const NUMBER_OPERATORS: { key: string; value: string }[] = [
  { key: 'EQ', value: 'equal to' },
  { key: 'BETWEEN', value: 'in between' },
  { key: 'LT', value: 'less than' },
  { key: 'GT', value: 'greater than' },
] as const;

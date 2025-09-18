export const selectChangedEventName = 'select-changed';

export interface SelectChangedEventPayload<T> {
  value: T;
}

export class SelectChangedEvent<T> extends CustomEvent<
  SelectChangedEventPayload<T>
> {
  constructor(payload: SelectChangedEventPayload<T>) {
    super(selectChangedEventName, {
      bubbles: true,
      composed: true,
      detail: payload,
    });
  }
}

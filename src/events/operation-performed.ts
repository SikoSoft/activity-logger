import { OperationType } from 'api-spec/models/Operation';

export const operationPerformedEventName = 'operation-performed';

export interface OperationPerformedEventPayload {
  type: OperationType;
  actions: number[];
}

export class OperationPerformedEvent extends CustomEvent<OperationPerformedEventPayload> {
  constructor(payload: OperationPerformedEventPayload) {
    super(operationPerformedEventName, {
      bubbles: true,
      composed: true,
      detail: payload,
    });
  }
}

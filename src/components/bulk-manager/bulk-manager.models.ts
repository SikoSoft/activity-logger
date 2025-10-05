import { OperationType } from 'api-spec/models/Operation';

export interface BulkOperationPayload {
  operation: { tags: string[]; type: OperationType };
  actions: number[];
}

export const taggingOperations = [
  OperationType.ADD_TAGS,
  OperationType.REMOVE_TAGS,
  OperationType.REPLACE_TAGS,
];

import { msg } from '@lit/localize';
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

export const operationTypeMsgMap: Record<OperationType, string> = {
  [OperationType.ADD_TAGS]: msg('operationType.addTags'),
  [OperationType.DELETE]: msg('operationType.delete'),
  [OperationType.REMOVE_TAGS]: msg('operationType.removeTags'),
  [OperationType.REPLACE_TAGS]: msg('operationType.replaceTags'),
};

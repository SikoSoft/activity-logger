export declare enum OperationType {
    DELETE = "delete",
    REPLACE_TAGS = "replaceTags",
    ADD_TAGS = "addTags",
    REMOVE_TAGS = "removeTags"
}
export interface DeleteOperation {
    type: OperationType.DELETE;
}
export interface ReplaceTagsOperation {
    type: OperationType.REPLACE_TAGS;
    tags: string[];
}
export interface AddTagsOperation {
    type: OperationType.ADD_TAGS;
    tags: string[];
}
export interface RemoveTagsOperation {
    type: OperationType.REMOVE_TAGS;
    tags: string[];
}
export type Operation = DeleteOperation | ReplaceTagsOperation | AddTagsOperation | RemoveTagsOperation;
export interface BulkOperation {
    operation: Operation;
    actions: number[];
}

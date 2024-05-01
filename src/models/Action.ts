export interface ActionItem {
  id: number;
  type: string;
  desc: string;
  createdAt: string;
  updatedAt: string;
  occurredAt: string;
}

export enum ActionView {
  INPUT = 'input',
  LIST = 'list',
}

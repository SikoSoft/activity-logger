export interface ActionItem {
  id: number;
  type: string;
  desc: string;
  createdAt: string;
  updatedAt: string;
  occurredAt: string;
  tags: string[];
}

export enum ActionView {
  INPUT = 'input',
  LIST = 'list',
}

export const defaultActionView: ActionView = ActionView.INPUT;

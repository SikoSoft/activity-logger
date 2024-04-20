export interface ActionItem {
  id: number;
  type: string;
  desc: string;
  time: number;
}

export enum ActionView {
  INPUT = 'input',
  LIST = 'list',
}

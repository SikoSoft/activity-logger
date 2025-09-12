import { ControlType } from '@/models/Control';
import { PropConfigMap, PropTypes } from '@/models/Prop';

export enum ListPaginatorProp {
  START = 'start',
  TOTAL = 'total',
  PER_PAGE = 'perPage',
}

export interface ListPaginatorProps extends PropTypes {
  [ListPaginatorProp.START]: number;
  [ListPaginatorProp.TOTAL]: number;
  [ListPaginatorProp.PER_PAGE]: number;
}

export const listPaginatorProps: PropConfigMap<ListPaginatorProps> = {
  [ListPaginatorProp.START]: {
    default: 1,
    control: {
      type: ControlType.NUMBER,
    },
    description: 'The current starting offset in the list',
  },
  [ListPaginatorProp.TOTAL]: {
    default: 10,
    control: {
      type: ControlType.NUMBER,
    },
    description: 'The total number of items in the list',
  },
  [ListPaginatorProp.PER_PAGE]: {
    default: 0,
    control: {
      type: ControlType.NUMBER,
    },
    description: 'The number of items to be displayed per page',
  },
};

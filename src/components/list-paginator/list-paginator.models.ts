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
    control: 'number',
    description: 'The current starting offset in the list',
  },
  [ListPaginatorProp.TOTAL]: {
    default: 10,
    control: 'number',
    description: 'The total number of items in the list',
  },
  [ListPaginatorProp.PER_PAGE]: {
    default: 0,
    control: 'number',
    description: 'The number of items to be displayed per page',
  },
};


import { PropConfigMap, PropTypes } from '@/models/Prop';
import { ListFilterTimeType } from 'api-spec/models/List';

export enum TimeFiltersProp {
  TIME_STR = 'timeStr',
  TYPE = 'type',
  DATE = 'date',
  START = 'start',
  END = 'end',
}

export interface TimeFiltersProps extends PropTypes {
  [TimeFiltersProp.TIME_STR]: string;
  [TimeFiltersProp.TYPE]: ListFilterTimeType;
  [TimeFiltersProp.DATE]: string;
  [TimeFiltersProp.START]: string;
  [TimeFiltersProp.END]: string;
}

export const timeFiltersProps: PropConfigMap<TimeFiltersProps> = {
  [TimeFiltersProp.TIME_STR]: {
    default: '',
    control: 'text',
    description: 'The time string',
  },
  [TimeFiltersProp.TYPE]: {
    default: ListFilterTimeType.ALL_TIME,
    control: 'text',
    description: 'The type of time filter',
  },
  [TimeFiltersProp.DATE]: {
    default: '',
    control: 'text',
    description: 'The date',
  },
  [TimeFiltersProp.START]: {
    default: '',
    control: 'text',
    description: 'The start date',
  },
  [TimeFiltersProp.END]: {
    default: '',
    control: 'text',
    description: 'The end date',
  },
};

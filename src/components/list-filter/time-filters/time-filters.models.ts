import { ControlType } from '@/models/Control';
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
    control: {
      type: ControlType.TEXT,
    },
    description: 'The time string',
  },
  [TimeFiltersProp.TYPE]: {
    default: ListFilterTimeType.ALL_TIME,
    control: {
      type: ControlType.TEXT,
    },
    description: 'The type of time filter',
  },
  [TimeFiltersProp.DATE]: {
    default: '',
    control: {
      type: ControlType.TEXT,
    },
    description: 'The date',
  },
  [TimeFiltersProp.START]: {
    default: '',
    control: {
      type: ControlType.TEXT,
    },
    description: 'The start date',
  },
  [TimeFiltersProp.END]: {
    default: '',
    control: {
      type: ControlType.TEXT,
    },
    description: 'The end date',
  },
};

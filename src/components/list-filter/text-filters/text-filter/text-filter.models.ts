import { ControlType } from '@/models/Control';
import { PropConfigMap, PropTypes } from '@/models/Prop';
import { TextType } from 'api-spec/models/List';

export enum TextFilterProp {
  TYPE = 'type',
  SUB_STR = 'subStr',
  INDEX = 'index',
}

export interface TextFilterProps extends PropTypes {
  [TextFilterProp.TYPE]: TextType;
  [TextFilterProp.SUB_STR]: string;
  [TextFilterProp.INDEX]: number;
}

export const textFilterProps: PropConfigMap<TextFilterProps> = {
  [TextFilterProp.TYPE]: {
    default: TextType.CONTAINS,
    control: {
      type: ControlType.TEXT,
    },
    description: 'The type of text filter',
  },
  [TextFilterProp.SUB_STR]: {
    default: '',
    control: {
      type: ControlType.TEXT,
    },
    description: 'The substring to filter by',
  },
  [TextFilterProp.INDEX]: {
    default: -1,
    control: {
      type: ControlType.NUMBER,
    },
    description: 'The index of the filter',
  },
};

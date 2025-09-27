import { PropConfigMap, PropTypes } from '@/models/Prop';
import { ControlType } from '@/models/Control';

export enum ActionFormProp {
  ACTION_ID = 'actionId',
  TYPE = 'type',
  DESC = 'desc',
  OCCURRED_AT = 'occurredAt',
  TAGS = 'tags',
  TAG_VALUE = 'tagValue',
}

export interface ActionFormProps extends PropTypes {
  [ActionFormProp.ACTION_ID]: number;
  [ActionFormProp.TYPE]: number;
  [ActionFormProp.DESC]: string;
  [ActionFormProp.OCCURRED_AT]: string;
  [ActionFormProp.TAGS]: string[];
  [ActionFormProp.TAG_VALUE]: string;
}

export const actionFormProps: PropConfigMap<ActionFormProps> = {
  [ActionFormProp.ACTION_ID]: {
    default: 0,
    control: {
      type: ControlType.NUMBER,
    },
    description: 'The ID of the action',
  },
  [ActionFormProp.TYPE]: {
    default: 0,
    control: {
      type: ControlType.NUMBER,
    },
    description: 'The type of the action',
  },
  [ActionFormProp.DESC]: {
    default: '',
    control: {
      type: ControlType.TEXT,
    },
    description: 'The description of the action',
  },
  [ActionFormProp.OCCURRED_AT]: {
    default: '',
    control: {
      type: ControlType.TEXT,
    },
    description: 'The occurrence date of the action',
  },
  [ActionFormProp.TAGS]: {
    default: [],
    control: {
      type: ControlType.TEXT,
    },
    description: 'The tags of the action',
  },
  [ActionFormProp.TAG_VALUE]: {
    default: '',
    control: {
      type: ControlType.TEXT,
    },
    description: 'The value of the tag',
  },
};

export interface RequestBody {
  desc: string;
  occurredAt: string;
  timeZone: number;
  tags: string[];
}

export enum SuggestionInputType {
  TAG = 'tag',
  ACTION = 'action',
}

export type SuggestionLastInput = Record<
  SuggestionInputType,
  { hadResults: boolean; value: string }
>;

import { PropConfigMap, PropTypes } from '@/models/Prop';

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
  [ActionFormProp.TYPE]: string;
  [ActionFormProp.DESC]: string;
  [ActionFormProp.OCCURRED_AT]: string;
  [ActionFormProp.TAGS]: string[];
  [ActionFormProp.TAG_VALUE]: string;
}

export const actionFormProps: PropConfigMap<ActionFormProps> = {
  [ActionFormProp.ACTION_ID]: {
    default: 0,
    control: 'number',
    description: 'The ID of the action',
  },
  [ActionFormProp.TYPE]: {
    default: '',
    control: 'text',
    description: 'The type of the action',
  },
  [ActionFormProp.DESC]: {
    default: '',
    control: 'text',
    description: 'The description of the action',
  },
  [ActionFormProp.OCCURRED_AT]: {
    default: '',
    control: 'text',
    description: 'The occurrence date of the action',
  },
  [ActionFormProp.TAGS]: {
    default: [],
    control: 'text',
    description: 'The tags of the action',
  },
  [ActionFormProp.TAG_VALUE]: {
    default: '',
    control: 'text',
    description: 'The value of the tag',
  },
};

export interface RequestBody {
  type: string;
  desc: string;
  occurredAt: string;
  timeZone: number;
  tags: string[];
}

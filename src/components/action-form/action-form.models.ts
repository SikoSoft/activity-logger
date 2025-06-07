import { ItemProperty } from '@/models/Entity';
import { PropConfigMap, PropTypes } from '@/models/Prop';

export enum ActionFormProp {
  ACTION_ID = 'actionId',
  TYPE = 'type',
  DESC = 'desc',
  OCCURRED_AT = 'occurredAt',
  TAGS = 'tags',
  TAG_VALUE = 'tagValue',
  PROPERTIES = 'properties',
}

export interface ActionFormProps extends PropTypes {
  [ActionFormProp.ACTION_ID]: number;
  [ActionFormProp.TYPE]: number;
  [ActionFormProp.DESC]: string;
  [ActionFormProp.OCCURRED_AT]: string;
  [ActionFormProp.TAGS]: string[];
  [ActionFormProp.TAG_VALUE]: string;
  [ActionFormProp.PROPERTIES]: ItemProperty[];
}

export const actionFormProps: PropConfigMap<ActionFormProps> = {
  [ActionFormProp.ACTION_ID]: {
    default: 0,
    control: 'number',
    description: 'The ID of the action',
  },
  [ActionFormProp.TYPE]: {
    default: 0,
    control: 'number',
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
  [ActionFormProp.PROPERTIES]: {
    default: [],
    control: 'text',
    description: 'The properties of the action',
  },
};

export interface RequestBody {
  desc: string;
  occurredAt: string;
  timeZone: number;
  tags: string[];
  properties: ItemProperty[];
}

export enum SuggestionInputType {
  TAG = 'tag',
  ACTION = 'action',
}

export type SuggestionLastInput = Record<
  SuggestionInputType,
  { hadResults: boolean; value: string }
>;

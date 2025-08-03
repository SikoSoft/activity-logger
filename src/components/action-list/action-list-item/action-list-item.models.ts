import { Property } from '@/mock/entity-config';
import { PropConfigMap, PropTypes } from '@/models/Prop';

export enum ActionListItemProp {
  TYPE = 'type',
  ACTION_ID = 'actionId',
  DESC = 'desc',
  CREATED_AT = 'createdAt',
  UPDATED_AT = 'updatedAt',
  OCCURRED_AT = 'occurredAt',
  TAGS = 'tags',
  SELECTED = 'selected',
  PROPERTIES = 'properties',
  DEBUG = 'debug',
}

export interface ActionListItemProps extends PropTypes {
  [ActionListItemProp.TYPE]: string;
  [ActionListItemProp.ACTION_ID]: number;
  [ActionListItemProp.DESC]: string;
  [ActionListItemProp.CREATED_AT]: string;
  [ActionListItemProp.UPDATED_AT]: string;
  [ActionListItemProp.OCCURRED_AT]: string;
  [ActionListItemProp.TAGS]: string[];
  [ActionListItemProp.SELECTED]: boolean;
  [ActionListItemProp.PROPERTIES]: Property[];
  [ActionListItemProp.DEBUG]: boolean;
}

export const actionListItemProps: PropConfigMap<ActionListItemProps> = {
  [ActionListItemProp.TYPE]: {
    default: '',
    control: 'text',
    description: 'The type of the action',
  },
  [ActionListItemProp.ACTION_ID]: {
    default: 0,
    control: 'number',
    description: 'The ID of the action',
  },
  [ActionListItemProp.DESC]: {
    default: '',
    control: 'text',
    description: 'The description of the action',
  },
  [ActionListItemProp.CREATED_AT]: {
    default: '',
    control: 'text',
    description: 'The creation date of the action',
  },
  [ActionListItemProp.UPDATED_AT]: {
    default: '',
    control: 'text',
    description: 'The update date of the action',
  },
  [ActionListItemProp.OCCURRED_AT]: {
    default: '',
    control: 'text',
    description: 'The occurrence date of the action',
  },
  [ActionListItemProp.TAGS]: {
    default: [],
    control: 'text',
    description: 'The tags of the action',
  },
  [ActionListItemProp.SELECTED]: {
    default: false,
    control: 'boolean',
    description: 'Whether the action is selected',
  },
  [ActionListItemProp.PROPERTIES]: {
    default: [],
    control: 'text',
    description: 'The properties of the action',
  },
  [ActionListItemProp.DEBUG]: {
    default: false,
    control: 'boolean',
    description: 'Whether debug mode is enabled',
  },
};

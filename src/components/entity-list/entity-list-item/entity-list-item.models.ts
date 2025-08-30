import { Property } from '@/mock/entity-config';
import { PropConfigMap, PropTypes } from '@/models/Prop';

export enum EntityListItemProp {
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

export interface EntityListItemProps extends PropTypes {
  [EntityListItemProp.TYPE]: string;
  [EntityListItemProp.ACTION_ID]: number;
  [EntityListItemProp.DESC]: string;
  [EntityListItemProp.CREATED_AT]: string;
  [EntityListItemProp.UPDATED_AT]: string;
  [EntityListItemProp.OCCURRED_AT]: string;
  [EntityListItemProp.TAGS]: string[];
  [EntityListItemProp.SELECTED]: boolean;
  [EntityListItemProp.PROPERTIES]: Property[];
  [EntityListItemProp.DEBUG]: boolean;
}

export const entityListItemProps: PropConfigMap<EntityListItemProps> = {
  [EntityListItemProp.TYPE]: {
    default: '',
    control: 'text',
    description: 'The type of the action',
  },
  [EntityListItemProp.ACTION_ID]: {
    default: 0,
    control: 'number',
    description: 'The ID of the action',
  },
  [EntityListItemProp.DESC]: {
    default: '',
    control: 'text',
    description: 'The description of the action',
  },
  [EntityListItemProp.CREATED_AT]: {
    default: '',
    control: 'text',
    description: 'The creation date of the action',
  },
  [EntityListItemProp.UPDATED_AT]: {
    default: '',
    control: 'text',
    description: 'The update date of the action',
  },
  [EntityListItemProp.OCCURRED_AT]: {
    default: '',
    control: 'text',
    description: 'The occurrence date of the action',
  },
  [EntityListItemProp.TAGS]: {
    default: [],
    control: 'text',
    description: 'The tags of the action',
  },
  [EntityListItemProp.SELECTED]: {
    default: false,
    control: 'boolean',
    description: 'Whether the action is selected',
  },
  [EntityListItemProp.PROPERTIES]: {
    default: [],
    control: 'text',
    description: 'The properties of the action',
  },
  [EntityListItemProp.DEBUG]: {
    default: false,
    control: 'boolean',
    description: 'Whether debug mode is enabled',
  },
};

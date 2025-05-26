import { PropConfigMap, PropTypes } from '@/models/Prop';

export enum ItemPropertyProp {
  _ID = '_id',
  PROPERTY_ID = 'propertyId',
  VALUE = 'value',
}

export interface ItemPropertyProps extends PropTypes {
  [ItemPropertyProp._ID]: number;
  [ItemPropertyProp.PROPERTY_ID]: number;
  [ItemPropertyProp.VALUE]: unknown;
}

export const itemPropertyProps: PropConfigMap<ItemPropertyProps> = {
  [ItemPropertyProp._ID]: {
    default: 0,
    control: 'number',
    description: 'The ID of the item property',
  },
  [ItemPropertyProp.PROPERTY_ID]: {
    default: 0,
    control: 'number',
    description: 'The ID of the property associated with the item property',
  },
  [ItemPropertyProp.VALUE]: {
    default: '',
    control: 'text',
    description: 'The value(s) of the item property',
  },
};

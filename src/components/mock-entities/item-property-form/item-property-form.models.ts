import { PropConfigMap, PropTypes } from '@/models/Prop';

export enum ItemPropertyFormProp {
  _ID = '_id',
  PROPERTY_ID = 'propertyId',
  VALUE = 'value',
}

export interface ItemPropertyFormProps extends PropTypes {
  [ItemPropertyFormProp._ID]: number;
  [ItemPropertyFormProp.PROPERTY_ID]: number;
  [ItemPropertyFormProp.VALUE]: unknown;
}

export const itemPropertyFormProps: PropConfigMap<ItemPropertyFormProps> = {
  [ItemPropertyFormProp._ID]: {
    default: 0,
    control: 'number',
    description: 'The ID of the item property',
  },
  [ItemPropertyFormProp.PROPERTY_ID]: {
    default: 0,
    control: 'number',
    description: 'The ID of the property associated with the item property',
  },
  [ItemPropertyFormProp.VALUE]: {
    default: '',
    control: 'text',
    description: 'The value(s) of the item property',
  },
};

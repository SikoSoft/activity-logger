import { PropConfigMap, PropTypes } from '@/models/Prop';
import { ItemProperty } from '@/models/Entity';

export enum ItemPropertyProp {
  DATA = 'data',
}

export interface ItemPropertyProps extends PropTypes {
  [ItemPropertyProp.DATA]: ItemProperty;
}

export const itemPropertyProps: PropConfigMap<ItemPropertyProps> = {
  [ItemPropertyProp.DATA]: {
    default: { id: 0, value: [] },
    control: 'text',
    description: 'The data to be displayed in the item property',
  },
};

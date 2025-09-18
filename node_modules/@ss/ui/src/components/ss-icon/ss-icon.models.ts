import { PropConfigMap, PropTypes } from '../../models/Prop';

export enum IconName {
  PROFILE = 'profile',
  ARROW_CIRCLE_LEFT = 'arrowCircleLeft',
  ARROW_CIRCLE_RIGHT = 'arrowCircleRight',
  VALID_CIRCLE = 'validCircle',
  INVALID_CIRCLE = 'invalidCircle',
  GEAR = 'gear',
  DELETE = 'delete',
}

export enum SSIconProp {
  NAME = 'name',
  SIZE = 'size',
  COLOR = 'color',
}

export interface SSIconProps extends PropTypes {
  [SSIconProp.NAME]: IconName;
  [SSIconProp.SIZE]: number;
  [SSIconProp.COLOR]: string;
}

export const ssIconProps: PropConfigMap<SSIconProps> = {
  [SSIconProp.NAME]: {
    default: IconName.PROFILE,
    description: 'The name of the icon to display',
    control: 'text',
  },
  [SSIconProp.SIZE]: {
    default: 24,
    description: 'The size of the icon in pixels',
    control: 'number',
  },
  [SSIconProp.COLOR]: {
    default: '#000',
    description: 'The color of the icon',
    control: 'text',
  },
};

/*
export type IconMap = Record<IconName, string>;
export const iconMap: IconMap = {
  [IconName.PROFILE]:
    'M12 12C14.21 12 16 10.21 16 8S14.21 4 12 4 8 5.79 8 8s1.79 4 4 4z',
};
*/

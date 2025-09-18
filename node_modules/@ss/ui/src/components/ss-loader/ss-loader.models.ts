import { PropConfigMap, PropTypes } from '../../models/Prop';

export enum SSLoaderProp {
  PADDED = 'padded',
}

export interface SSLoaderProps extends PropTypes {
  [SSLoaderProp.PADDED]: boolean;
}

export const ssLoaderProps: PropConfigMap<SSLoaderProps> = {
  [SSLoaderProp.PADDED]: {
    default: false,
    description: 'Whether to provide padding around the loader',
    control: 'boolean',
  },
};

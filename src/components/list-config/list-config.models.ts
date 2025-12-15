import { PropTypes, PropConfigMap } from '@/models/Prop';
import { ControlType } from 'api-spec/models/Setting';

export enum ListConfigProp {
  VIEW_ONLY = 'viewOnly',
}

export interface ListConfigProps extends PropTypes {
  [ListConfigProp.VIEW_ONLY]: boolean;
}

export const listConfigProps: PropConfigMap<ListConfigProps> = {
  [ListConfigProp.VIEW_ONLY]: {
    default: false,
    control: {
      type: ControlType.BOOLEAN,
    },
    description: 'Whether the list config is view only',
  },
};

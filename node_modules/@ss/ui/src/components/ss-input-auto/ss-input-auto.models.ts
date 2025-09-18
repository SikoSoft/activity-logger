import { PropConfigMap, PropTypes } from '../../models/Prop';

export enum SSInputAutoProp {
  INPUT = 'input',
  MAX_MATCHES = 'maxMatches',
  MIN_INPUT = 'minInput',
  SUGGESTIONS = 'suggestions',
}

export interface SSInputAutoProps extends PropTypes {
  [SSInputAutoProp.INPUT]: string;
  [SSInputAutoProp.MAX_MATCHES]: number;
  [SSInputAutoProp.MIN_INPUT]: number;
  [SSInputAutoProp.SUGGESTIONS]: string[];
}

export const ssInputAutoProps: PropConfigMap<SSInputAutoProps> = {
  [SSInputAutoProp.INPUT]: {
    default: '',
    control: 'text',
    description: 'The input value',
  },
  [SSInputAutoProp.MAX_MATCHES]: {
    default: 5,
    control: 'number',
    description: 'The maximum number of suggestions to display',
  },
  [SSInputAutoProp.MIN_INPUT]: {
    default: 1,
    control: 'number',
    description:
      'The minimum number of characters to start showing suggestions',
  },
  [SSInputAutoProp.SUGGESTIONS]: {
    default: [],
    control: 'text',
    description: 'The list of suggestions to display',
  },
};

import { Meta } from '@storybook/web-components';
import { PropConfigMap, PropTypes } from '../models/Prop';

export class StoryBook {
  public static buildArgTypes<Props extends PropTypes>(
    props: PropConfigMap<Props>,
  ): Meta<Props>['argTypes'] {
    const argTypes: Meta<Props>['argTypes'] = {};

    Object.keys(props).forEach(propKey => {
      const propName = propKey as keyof PropConfigMap<Props>;
      const propConfig = props[propName];
      argTypes[propName] = {
        description: propConfig.description,
        control: propConfig.control,
        table: {
          defaultValue: {
            summary: JSON.stringify(propConfig.default).replace(/^"|"$/g, ''),
          },
        },
      };
    });

    return argTypes;
  }
}

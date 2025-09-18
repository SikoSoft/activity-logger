import { Meta } from '@storybook/web-components';
import { PropConfigMap, PropTypes } from '../models/Prop';
export declare class StoryBook {
    static buildArgTypes<Props extends PropTypes>(props: PropConfigMap<Props>): Meta<Props>['argTypes'];
}

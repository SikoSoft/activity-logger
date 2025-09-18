import { html } from 'lit';
import { StoryBook } from '../../lib/StoryBook';
import './ss-carousel';
import { ssCarouselProps } from './ss-carousel.models';
const argTypes = StoryBook.buildArgTypes(ssCarouselProps);
const meta = {
    title: 'components/ss-carousel',
    tags: ['autodocs'],
    parameters: {
        layout: 'centered',
    },
    args: {
        navigationIndex: ssCarouselProps.navigationIndex.default,
        showButtons: true,
        infinite: true,
        width: ssCarouselProps.width.default,
        height: ssCarouselProps.height.default,
        gap: ssCarouselProps.gap.default,
        perspective: ssCarouselProps.perspective.default,
        discrete: ssCarouselProps.discrete.default,
    },
    argTypes,
    render: args => html `
    <ss-carousel
      ?showButtons=${args.showButtons}
      ?infinite=${args.infinite}
      width=${args.width}
      height=${args.height}
      gap=${args.gap}
      perspective=${args.perspective}
      ?discrete=${args.discrete}
      navigationIndex=${args.navigationIndex}
    >
      <div class="something">Test</div>
      <div class="different">Text</div>
      <div>3</div>
      <div>4</div>
      <span>Cat</span>
      <div>6</div>
      <div>Dog</div>
      <div>8</div>
    </ss-carousel>
  `,
};
export default meta;
export const ShowButtonsInfinite = {
    args: {
        showButtons: true,
        infinite: true,
    },
};
export const ShowButtonsFinite = {
    args: {
        showButtons: true,
        infinite: false,
    },
};
export const NoButtons = {
    args: {
        showButtons: false,
    },
};
export const DiscreteWithButtons = {
    args: {
        discrete: true,
        buttons: true,
    },
};
export const DiscreteWithoutButtons = {
    args: {
        discrete: true,
        buttons: false,
    },
};
//# sourceMappingURL=ss-carousel.stories.js.map
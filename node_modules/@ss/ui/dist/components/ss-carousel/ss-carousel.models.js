export var SSCarouselProp;
(function (SSCarouselProp) {
    SSCarouselProp["INFINITE"] = "infinite";
    SSCarouselProp["NAVIGATION_INDEX"] = "navigationIndex";
    SSCarouselProp["SHOW_BUTTONS"] = "showButtons";
    SSCarouselProp["MOUSE_SCROLL"] = "mouseScroll";
    SSCarouselProp["WIDTH"] = "width";
    SSCarouselProp["HEIGHT"] = "height";
    SSCarouselProp["GAP"] = "gap";
    SSCarouselProp["PERSPECTIVE"] = "perspective";
    SSCarouselProp["DISCRETE"] = "discrete";
})(SSCarouselProp || (SSCarouselProp = {}));
export const ssCarouselProps = {
    [SSCarouselProp.INFINITE]: {
        default: false,
        control: 'boolean',
        description: 'Whether the carousel should loop infinitely',
    },
    [SSCarouselProp.NAVIGATION_INDEX]: {
        default: 0,
        control: 'number',
        description: 'The index of the active slide',
    },
    [SSCarouselProp.SHOW_BUTTONS]: {
        default: false,
        control: 'boolean',
        description: 'Whether to show the navigation buttons',
    },
    [SSCarouselProp.MOUSE_SCROLL]: {
        default: false,
        control: 'boolean',
        description: 'Whether to allow mouse scrolling',
    },
    [SSCarouselProp.WIDTH]: {
        default: `210px`,
        control: 'text',
        description: 'The width of the carousel',
    },
    [SSCarouselProp.HEIGHT]: {
        default: 140,
        control: 'number',
        description: 'The height of the carousel',
    },
    [SSCarouselProp.GAP]: {
        default: 10,
        control: 'number',
        description: 'The gap between frames',
    },
    [SSCarouselProp.PERSPECTIVE]: {
        default: 500,
        control: 'number',
        description: 'The perspective of the carousel',
    },
    [SSCarouselProp.DISCRETE]: {
        default: false,
        control: 'boolean',
        description: 'Whether the carousel should show inactive frames when it does not have contact',
    },
};
//# sourceMappingURL=ss-carousel.models.js.map
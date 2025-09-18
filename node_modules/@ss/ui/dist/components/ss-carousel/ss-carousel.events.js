export const carouselSlideChangedEventName = 'carousel-slide-changed';
export class CarouselSlideChangedEvent extends CustomEvent {
    constructor(payload) {
        super(carouselSlideChangedEventName, {
            bubbles: true,
            composed: true,
            detail: payload,
        });
    }
}
//# sourceMappingURL=ss-carousel.events.js.map
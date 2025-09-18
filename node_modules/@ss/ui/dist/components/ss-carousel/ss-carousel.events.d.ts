export declare const carouselSlideChangedEventName = "carousel-slide-changed";
export interface CarouselSlideChangedEventPayload {
    navigationIndex: number;
    slideIndex: number;
}
export declare class CarouselSlideChangedEvent extends CustomEvent<CarouselSlideChangedEventPayload> {
    constructor(payload: CarouselSlideChangedEventPayload);
}

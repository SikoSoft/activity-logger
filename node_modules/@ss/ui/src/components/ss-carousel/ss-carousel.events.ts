export const carouselSlideChangedEventName = 'carousel-slide-changed';

export interface CarouselSlideChangedEventPayload {
  navigationIndex: number;
  slideIndex: number;
}

export class CarouselSlideChangedEvent extends CustomEvent<CarouselSlideChangedEventPayload> {
  constructor(payload: CarouselSlideChangedEventPayload) {
    super(carouselSlideChangedEventName, {
      bubbles: true,
      composed: true,
      detail: payload,
    });
  }
}

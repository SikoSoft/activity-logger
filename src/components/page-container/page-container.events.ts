export const themesUpdatedEventName = 'themes-updated';

export interface ThemesUpdatedPayload {
  themes: string[];
}

export class ThemesUpdatedEvent extends CustomEvent<ThemesUpdatedPayload> {
  constructor(detail: ThemesUpdatedPayload) {
    super(themesUpdatedEventName, {
      detail,
      bubbles: true,
      composed: true,
    });
  }
}

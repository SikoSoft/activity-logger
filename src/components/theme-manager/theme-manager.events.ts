export const themeAddedEventName = 'themes-updated';

export interface ThemesUpdatedPayload {
  themes: string[];
}

export class ThemesUpdatedEvent extends CustomEvent<ThemesUpdatedPayload> {
  constructor(detail: ThemesUpdatedPayload) {
    super(themeAddedEventName, {
      detail,
      bubbles: true,
      composed: true,
    });
  }
}

export const themesSavedEventName = 'themes-saved';

export interface ThemesSavedPayload {
  themes: string[];
}

export class ThemesSavedEvent extends CustomEvent<ThemesSavedPayload> {
  constructor(detail: ThemesSavedPayload) {
    super(themesSavedEventName, {
      detail,
      bubbles: true,
      composed: true,
    });
  }
}

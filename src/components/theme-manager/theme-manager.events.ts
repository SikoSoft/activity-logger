export const themeAddedEventName = 'theme-added';

export interface ThemeAddedPayload {
  theme: string;
}

export class ThemeAddedEvent extends CustomEvent<ThemeAddedPayload> {
  constructor(detail: ThemeAddedPayload) {
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

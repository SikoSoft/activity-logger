import { ThemeName } from '@/models/Page';
import { themes } from '@/styles/theme';
import { LitElement } from 'lit';
import { MobxReactionsController } from './MobxReactionController';
import { appState } from '@/state';
import {
  ThemesUpdatedEvent,
  themesUpdatedEventName,
} from '@/components/page-container/page-container.events';

export type ThemedElement = LitElement & {
  firstUpdated?: (changedProperties: Map<string, unknown>) => void;
  initialAdoptStyles: CSSStyleSheet[];
};

const isValidTheme = (themeName: string): themeName is ThemeName => {
  return Object.values(ThemeName).includes(themeName as ThemeName);
};

const isThemesUpdatedEvent = (e: Event): e is ThemesUpdatedEvent => {
  return (e as ThemesUpdatedEvent).type === themesUpdatedEventName;
};

function adoptStyles(element: ThemedElement, themeNames: string[]): void {
  //console.log('adoptStyles');
  const root = element.shadowRoot as ShadowRoot | null;
  if (!root || !('adoptedStyleSheets' in root)) {
    return;
  }

  //const contentNode = document.querySelector('page-container');
  //if (contentNode) {
  //const classes = [...contentNode.classList];

  //root.adoptedStyleSheets = [];
  const activeSheets: CSSStyleSheet[] = [];
  for (const themeName of themeNames) {
    //const themeName = cssClass as ThemeName;
    if (isValidTheme(themeName)) {
      const sheet = themes[themeName].sheet;
      activeSheets.push(sheet);
      //root.adoptedStyleSheets.push(sheet); // = activeSheets;
    }
  }
  /*
  console.log(
    'adoptStyles activeSheets:',
    root,
    //JSON.stringify(activeSheets),
    element.initialAdoptStyles.length,
    JSON.stringify(root.adoptedStyleSheets.length),
  );
  */
  root.adoptedStyleSheets = [...element.initialAdoptStyles, ...activeSheets];
  //root.adoptedStyleSheets = activeSheets;
  //element.requestUpdate();
  //  }
}

export function themed(): <T extends new (...args: unknown[]) => LitElement>(
  constructor: T,
) => T {
  return function <T extends new (...args: unknown[]) => LitElement>(
    constructor: T,
  ) {
    const prototype = constructor.prototype as ThemedElement;
    const originalFirstUpdated = prototype.firstUpdated;
    prototype.firstUpdated = function (
      changedProperties: Map<string, unknown>,
    ): void {
      this.initialAdoptStyles = this.shadowRoot
        ? (this.shadowRoot.adoptedStyleSheets as CSSStyleSheet[])
        : [];

      const contentNode = document.querySelector('page-container');
      let classes: string[] = [];
      if (contentNode) {
        classes = [...contentNode.classList];
      }
      adoptStyles(this, classes);

      window.addEventListener(themesUpdatedEventName, (e: Event) => {
        if (!isThemesUpdatedEvent(e)) {
          return;
        }

        console.log('themed event listener:', JSON.stringify(e.detail.themes));
        adoptStyles(this, e.detail.themes);
      });

      if (originalFirstUpdated) {
        originalFirstUpdated.call(this, changedProperties);
      }
    };
    return constructor;
  };
}

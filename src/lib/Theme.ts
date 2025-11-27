import { ThemeName } from '@/models/Page';
import { themes } from '@/styles/theme';
import { LitElement } from 'lit';
import { MobxReactionsController } from './MobxReactionController';
import { appState } from '@/state';

export class Theme {
  static getAvailableThemes(): string[] {
    return ['light', 'dark'];
  }
}
function adoptStyles(element: LitElement): void {
  if (element.shadowRoot && 'adoptedStyleSheets' in element.shadowRoot) {
    const contentNode = document.querySelector('page-container');
    if (contentNode) {
      const classes = [...contentNode.classList];
      if (classes.length) {
        for (const cssClass of classes) {
          const themeName = cssClass as ThemeName;
          if (Object.values(ThemeName).includes(themeName)) {
            const sheet = themes[themeName].sheet;
            element.shadowRoot.adoptedStyleSheets.push(sheet);
          }
        }
      }
    }
  }
}

export function themed(): <T extends new (...args: unknown[]) => LitElement>(
  constructor: T,
) => T {
  return function <T extends new (...args: unknown[]) => LitElement>(
    constructor: T,
  ) {
    const prototype = constructor.prototype as LitElement & {
      firstUpdated?: (changedProperties: Map<string, unknown>) => void;
    };
    const originalFirstUpdated = prototype.firstUpdated;
    prototype.firstUpdated = function (
      changedProperties: Map<string, unknown>,
    ): void {
      adoptStyles(this);

      const rx = new MobxReactionsController(this);

      rx.add({
        expr: () => appState.listConfig,
        effect: (): void => {
          adoptStyles(this);
        },
        opts: { fireImmediately: true },
      });

      rx.add({
        expr: () => appState.theme,
        effect: (): void => {
          adoptStyles(this);
        },
        opts: { fireImmediately: true },
      });

      if (originalFirstUpdated) {
        originalFirstUpdated.call(this, changedProperties);
      }
    };
    return constructor;
  };
}

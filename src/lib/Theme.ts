import { ThemeName } from '@/models/Page';
import { themes } from '@/styles/theme';
import { LitElement } from 'lit';

export class Theme {
  static getAvailableThemes(): string[] {
    return ['light', 'dark'];
  }
}
function adoptStyles(element: LitElement) {
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
export function themed() {
  return function <T extends new (...args: any[]) => LitElement>(
    constructor: T,
  ) {
    const prototype = constructor.prototype as LitElement & {
      firstUpdated?: (changedProperties: Map<string, unknown>) => void;
    };
    const originalFirstUpdated = prototype.firstUpdated;
    prototype.firstUpdated = function (
      changedProperties: Map<string, unknown>,
    ) {
      adoptStyles(this);
      if (originalFirstUpdated) {
        originalFirstUpdated.call(this, changedProperties);
      }
    };
    return constructor;
  };
}

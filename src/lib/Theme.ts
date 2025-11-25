import { LitElement, CSSResult } from 'lit';

export class Theme {
  static getAvailableThemes(): string[] {
    return ['light', 'dark'];
  }
}

function adoptStyles(element: LitElement, styleSheet: CSSResult) {
  if (element.shadowRoot && 'adoptedStyleSheets' in element.shadowRoot) {
    // 1. Use 'as any' directly on the CSSResult instance
    // to access the internal _styleSheet property without a custom interface.
    const sheet = (styleSheet as any)._styleSheet;
    if (sheet) {
      // 2. Adopt the sheet
      element.shadowRoot.adoptedStyleSheets = [
        ...element.shadowRoot.adoptedStyleSheets,
        sheet,
      ];
      console.log(
        `[DECORATOR] Stylesheet adopted for ${element.constructor.name}.`,
      );
    } else {
      console.warn(
        `[DECORATOR] Could not find native stylesheet for ${element.constructor.name}.`,
      );
    }
  }
}
// 2. The Decorator Factory
export function addStyleSheet(styleSheet: CSSResult) {
  // This is the actual decorator function that modifies the class
  return function <T extends new (...args: any[]) => LitElement>(
    constructor: T,
  ) {
    // Get the prototype of the class being decorated
    const prototype = constructor.prototype as LitElement & {
      firstUpdated?: (changedProperties: Map<string, unknown>) => void;
    };
    // Store the original implementation of firstUpdated (could be undefined)
    const originalFirstUpdated = prototype.firstUpdated;
    // Override the firstUpdated method on the prototype
    prototype.firstUpdated = function (
      changedProperties: Map<string, unknown>,
    ) {
      // A. Run the Injected Logic (Add the style sheet)
      // 'this' refers to the component instance
      adoptStyles(this, styleSheet);
      // B. Run the Original Logic (Preserve component's custom code)
      if (originalFirstUpdated) {
        originalFirstUpdated.call(this, changedProperties);
      }
    };
    // Return the modified constructor
    return constructor;
  };
}

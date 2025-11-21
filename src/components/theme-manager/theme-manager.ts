import { html, LitElement, TemplateResult } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import {
  ThemeManagerProp,
  themeManagerProps,
  ThemeManagerProps,
} from './theme-manager.models';
import { translate } from '@/lib/Localization';

@customElement('theme-manager')
export class ThemeManager extends LitElement {
  @property({ type: Array })
  [ThemeManagerProp.THEMES]: ThemeManagerProps[ThemeManagerProp.THEMES] =
    themeManagerProps[ThemeManagerProp.THEMES].default;

  render(): TemplateResult {
    return html`
      <div>
        ${translate('themes')}
        ${this[ThemeManagerProp.THEMES].length > 0
          ? html`<ul>
              ${this[ThemeManagerProp.THEMES].map(
                theme => html`<li>${theme}</li>`,
              )}
            </ul>`
          : translate('noThemesActive')}
      </div>
    `;
  }
}

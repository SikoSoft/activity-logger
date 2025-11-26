import {
  css,
  html,
  LitElement,
  nothing,
  PropertyValues,
  TemplateResult,
} from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import {
  ThemeManagerProp,
  themeManagerProps,
  ThemeManagerProps,
} from './theme-manager.models';
import { translate } from '@/lib/Localization';
import { ThemeName } from '@/models/Page';
import { repeat } from 'lit/directives/repeat.js';

import '@ss/ui/components/sortable-list';
import '@ss/ui/components/sortable-item';
import '@ss/ui/components/ss-icon';
import { ThemesUpdatedEvent, ThemesSavedEvent } from './theme-manager.events';
import { classMap } from 'lit/directives/class-map.js';
import { SortUpdatedEvent } from '@ss/ui/components/sortable-list.events';
import { themed } from '@/lib/Theme';

@themed()
@customElement('theme-manager')
export class ThemeManager extends LitElement {
  static styles = css`
    ul {
      list-style: none;
      padding: 0;

      li {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0.5;
      }
    }

    .available-themes li.active {
      opacity: 0.5;
      pointer-events: none;

      ss-icon {
        display: none;
      }
    }

    ss-icon {
      cursor: pointer;
    }
  `;

  @property({ type: Array })
  [ThemeManagerProp.ACTIVE]: ThemeManagerProps[ThemeManagerProp.ACTIVE] =
    themeManagerProps[ThemeManagerProp.ACTIVE].default;

  @state()
  initialActive: string[] = [];

  @state()
  get available(): string[] {
    return Object.values(ThemeName);
  }

  @state()
  get enableSave(): boolean {
    return (
      JSON.stringify(this.initialActive) !==
      JSON.stringify(this[ThemeManagerProp.ACTIVE])
    );
  }

  protected firstUpdated(changedProperties: PropertyValues): void {
    super.firstUpdated(changedProperties);

    this.initialActive = [...this[ThemeManagerProp.ACTIVE]];
  }

  addTheme(theme: string): void {
    this.dispatchEvent(
      new ThemesUpdatedEvent({
        themes: [...this[ThemeManagerProp.ACTIVE], theme],
      }),
    );
  }

  removeTheme(theme: string): void {
    this.dispatchEvent(
      new ThemesUpdatedEvent({
        themes: this[ThemeManagerProp.ACTIVE].filter(t => t !== theme),
      }),
    );
  }

  saveThemes(): void {
    this.dispatchEvent(
      new ThemesSavedEvent({ themes: this[ThemeManagerProp.ACTIVE] }),
    );
  }

  handleSortUpdated(e: SortUpdatedEvent): void {
    const themes = e.detail.sortedIds;

    this.dispatchEvent(
      new ThemesUpdatedEvent({
        themes,
      }),
    );
  }

  render(): TemplateResult {
    return html`
      <div>
        <h3>${translate('availableThemes')}</h3>

        <ul class="available-themes">
          ${repeat(
            this.available,
            theme => theme,
            theme =>
              html`<li
                class=${classMap({
                  active: this[ThemeManagerProp.ACTIVE].includes(theme),
                })}
              >
                <span>${theme}</span
                ><ss-icon
                  name="add"
                  size="16"
                  @click=${(): void => this.addTheme(theme)}
                ></ss-icon>
              </li>`,
          )}
        </ul>

        <h3>${translate('activeThemes')}</h3>
        ${this[ThemeManagerProp.ACTIVE].length > 0
          ? html`<sortable-list
              class="active-themes"
              @sort-updated=${this.handleSortUpdated}
            >
              ${this[ThemeManagerProp.ACTIVE].map(
                theme =>
                  html`<sortable-item id=${theme}>
                    <span>${theme}</span>
                    <ss-icon
                      name="trash"
                      size="16"
                      @click=${(): void => this.removeTheme(theme)}
                    ></ss-icon>
                  </sortable-item>`,
              )}
            </sortable-list>`
          : translate('noThemesActive')}

        <div class="buttons">
          <ss-button
            ?disabled=${!this.enableSave}
            positive
            @click=${this.saveThemes}
            >${translate('save')}</ss-button
          >
        </div>
      </div>
    `;
  }
}

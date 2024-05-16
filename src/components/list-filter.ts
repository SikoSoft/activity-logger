import { LitElement, html, css } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { theme } from '../styles/theme';

import './tag/tag-manager';
import { translate } from '../util/strings';
import { ListFilterType } from '../models/ListFilters';
import { repeat } from 'lit/directives/repeat.js';
import { MobxLitElement } from '@adobe/lit-mobx';
import { appState } from '../state';

@customElement('list-filter')
export class ListFilter extends MobxLitElement {
  public state = appState;

  static styles = [
    theme,
    css`
      .filter {
        padding: 1rem;
      }

      fieldset {
        border-radius: 0.5rem;
      }
    `,
  ];

  @state() [ListFilterType.CONTAINS_ONE_OF]: string[] = [];
  @state() [ListFilterType.CONTAINS_ALL_OF]: string[] = [];
  @state() includeUntagged: boolean = false;

  private _handleIncludeUntaggedChanged() {
    console.log('handleIncludeUntaggedChanged');
    this.includeUntagged = !this.includeUntagged;
  }

  private _handleUpdateClick(e: CustomEvent): void {
    console.log('handleUpdateClick');

    Object.values(ListFilterType).forEach(type => {
      this.state.setListFilterTagging(type, this[type]);
    });
    this.state.setListFilterIncludeUntagged(this.includeUntagged);
    this.dispatchEvent(
      new CustomEvent('filter-updated', { bubbles: true, composed: true })
    );
  }

  private updateTags(type: ListFilterType, tags: string[]) {
    console.log('updateTags', type, tags);
    this[type] = tags;
  }

  render() {
    return html`
      <div class="box filter">
        ${repeat(
          Object.values(ListFilterType),
          type => type,
          type => html`
            <fieldset>
              <legend>${translate(type)}</legend>
              <tag-manager
                @updated=${(e: CustomEvent) => {
                  this.updateTags(type, e.detail.tags);
                }}
              ></tag-manager>
            </fieldset>
          `
        )}
        <div>
          <input
            id="include-unchanged"
            type="checkbox"
            ?checked=${this.includeUntagged}
            @change=${this._handleIncludeUntaggedChanged}
          />
          <label for="include-unchanged">${translate('includeUntagged')}</label>
        </div>
        <ss-button
          @click=${(e: CustomEvent) => {
            this._handleUpdateClick(e);
          }}
          text=${translate('updateFilter')}
        ></ss-button>
      </div>
    `;
  }
}

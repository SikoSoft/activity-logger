import { LitElement, html, css } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { theme } from '../styles/theme';

import './tag/tag-manager';
import { translate } from '../util/strings';
import { ListFilterType } from '../models/ListFilter';
import { repeat } from 'lit/directives/repeat.js';
import { MobxLitElement } from '@adobe/lit-mobx';
import { appState } from '../state';
import { storage } from '../lib/Storage';

@customElement('list-filter')
export class ListFilter extends MobxLitElement {
  public state = appState;

  static styles = [
    theme,
    css`
      .list-filter {
        padding: 1rem;
      }

      .list-filter.all .filters {
        opacity: 0.3;
        pointer-events: none;
      }

      fieldset {
        border-radius: 0.5rem;
      }
    `,
  ];

  @state() [ListFilterType.CONTAINS_ONE_OF]: string[] = [];
  @state() [ListFilterType.CONTAINS_ALL_OF]: string[] = [];
  @state() includeUntagged: boolean = false;
  @state() includeAll: boolean = true;

  @state() get classes() {
    return { box: true, 'list-filter': true, all: this.includeAll };
  }

  connectedCallback(): void {
    super.connectedCallback();
    Object.values(ListFilterType).forEach(type => {
      this[type] = this.state.listFilter.tagging[type];
    });
    this.includeUntagged = this.state.listFilter.includeUntagged;
    this.includeAll = this.state.listFilter.includeAll;
  }

  private _handleIncludeUntaggedChanged() {
    this.includeUntagged = !this.includeUntagged;
  }

  private _handleIncludeAllChanged() {
    this.includeAll = !this.includeAll;
  }

  private _handleUpdateClick(e: CustomEvent): void {
    Object.values(ListFilterType).forEach(type => {
      this.state.setListFilterTagging(type, this[type]);
    });
    this.state.setListFilterIncludeUntagged(this.includeUntagged);
    this.state.setListFilterIncludeAll(this.includeAll);
    storage.saveFilter(this.state.listFilter);
    this.dispatchEvent(
      new CustomEvent('filter-updated', { bubbles: true, composed: true })
    );
  }

  private updateTags(type: ListFilterType, tags: string[]) {
    this[type] = tags;
  }

  render() {
    return html`
      <div class=${classMap(this.classes)}>
        <div class="all">
          <input
            id="include-all"
            type="checkbox"
            ?checked=${this.includeAll}
            @change=${this._handleIncludeAllChanged}
          />
          <label for="include-all">${translate('includeAll')}</label>
        </div>
        <div class="filters">
          ${repeat(
            Object.values(ListFilterType),
            type => type,
            type => html`
              <fieldset>
                <legend>${translate(type)}</legend>
                <tag-manager
                  .tags=${this[type]}
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
            <label for="include-unchanged"
              >${translate('includeUntagged')}</label
            >
          </div>
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

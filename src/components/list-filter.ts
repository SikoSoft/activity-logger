import { LitElement, html, css, nothing } from 'lit';
import { customElement, query, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { theme } from '../styles/theme';

import './tag/tag-manager';
import './ss-input';
import { translate } from '../util/strings';
import {
  ListFilterType,
  ListFilter as ListFilterModel,
} from '../models/ListFilter';
import { repeat } from 'lit/directives/repeat.js';
import { MobxLitElement } from '@adobe/lit-mobx';
import { appState } from '../state';
import { SavedListFilter, storage } from '../lib/Storage';
import { SSInput } from './ss-input';

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

      .save {
        position: relative;
      }

      .save ss-input {
        position: absolute;
        bottom: 0%;
        width: 100%;
        opacity: 0;
        pointer-events: none;
        transition: all 0.3s;
      }

      .list-filter.save-mode .save ss-input {
        bottom: 100%;
        opacity: 1;
        pointer-events: initial;
      }
    `,
  ];

  @state() [ListFilterType.CONTAINS_ONE_OF]: string[] = [];
  @state() [ListFilterType.CONTAINS_ALL_OF]: string[] = [];
  @state() includeUntagged: boolean = false;
  @state() includeAll: boolean = true;

  @state() savedFilters: SavedListFilter[] = [];
  @state() saveMode: boolean = false;
  @state() filterName: string = '';
  @state() selectedSavedFilter: string = '';

  @query('#filter-name') filterNameInput!: SSInput;
  @query('#saved-filters') savedFiltersInput!: HTMLSelectElement;

  @state() get classes() {
    return {
      box: true,
      'list-filter': true,
      all: this.includeAll,
      'save-mode': this.saveMode,
      'valid-filter-name': this.filterNameIsValid,
    };
  }

  @state()
  get filterNameIsValid(): boolean {
    return this.filterName.length > 0;
  }

  @state()
  get saveButtonIsEnabled(): boolean {
    return !this.saveMode || this.filterNameIsValid;
  }

  get filter(): ListFilterModel {
    return {
      includeAll: this.includeAll,
      includeUntagged: this.includeUntagged,
      tagging: {
        containsOneOf: this.containsOneOf,
        containsAllOf: this.containsAllOf,
      },
    };
  }

  connectedCallback(): void {
    super.connectedCallback();
    Object.values(ListFilterType).forEach(type => {
      this[type] = this.state.listFilter.tagging[type];
    });
    this.includeUntagged = this.state.listFilter.includeUntagged;
    this.includeAll = this.state.listFilter.includeAll;
    this.savedFilters = storage.getSavedFilters();
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
    storage.saveActiveFilter(this.state.listFilter);
    this.dispatchEvent(
      new CustomEvent('filter-updated', { bubbles: true, composed: true })
    );
  }

  private async _saveFilter() {
    if (!this.saveMode) {
      this.saveMode = true;
      this.filterNameInput.focus();
      return;
    }

    await storage.saveFilter(this.filter, this.filterName);
    this.savedFilters = storage.getSavedFilters();

    this.filterNameInput.clear();
    this.saveMode = false;

    this.state.addToast(translate('filterSaved'));
  }

  private async _handleSaveClick(e: CustomEvent): Promise<void> {
    await this._saveFilter();
  }

  private _handleFilterNameChanged(e: CustomEvent): void {
    this.filterName = e.detail.value;
  }

  private _handleFilterNameSubmitted(e: CustomEvent): void {
    this._saveFilter();
  }

  private _handleSavedFilterChanged(e: Event) {
    this.selectedSavedFilter = this.savedFiltersInput.value;
    const savedFilter = this.savedFilters.find(
      savedFilter => savedFilter.id === this.savedFiltersInput.value
    );
    if (savedFilter) {
      this[ListFilterType.CONTAINS_ONE_OF] =
        savedFilter.filter.tagging[ListFilterType.CONTAINS_ONE_OF];
      this[ListFilterType.CONTAINS_ALL_OF] =
        savedFilter.filter.tagging[ListFilterType.CONTAINS_ALL_OF];
      this.includeUntagged = savedFilter.filter.includeUntagged;
      this.includeAll = savedFilter.filter.includeAll;
    }
  }

  private _handleDeleteSavedFilterClick(e: Event) {
    if (this.savedFiltersInput.value) {
      storage.deleteSavedFilter(this.savedFiltersInput.value);
      this.savedFiltersInput.value = '';
      this.savedFiltersInput.dispatchEvent(new Event('change'));
    }
    this.savedFilters = storage.getSavedFilters();
    this.state.addToast(translate('filterDeleted'));
  }

  private updateTags(type: ListFilterType, tags: string[]) {
    this[type] = tags;
  }

  render() {
    return html`
      <div class=${classMap(this.classes)}>
        ${this.savedFilters.length
          ? html`
              <div class="saved-filters">
                <select
                  id="saved-filters"
                  @change=${this._handleSavedFilterChanged}
                >
                  <option value="">${translate('savedFilters')}</option>
                  ${repeat(
                    this.savedFilters,
                    filter => filter.id,
                    filter => html`
                      <option value=${filter.id}>${filter.name}</option>
                    `
                  )}
                </select>
                ${this.selectedSavedFilter
                  ? html`
                      <ss-button
                        @click=${this._handleDeleteSavedFilterClick}
                        text=${translate('deleteFilter')}
                      ></ss-button>
                    `
                  : nothing}
              </div>
            `
          : nothing}
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
          text=${translate('useFilter')}
        ></ss-button>
        <div class="save">
          <ss-input
            @action-input-changed=${(e: CustomEvent) => {
              this._handleFilterNameChanged(e);
            }}
            @action-input-submitted=${(e: CustomEvent) => {
              this._handleFilterNameSubmitted(e);
            }}
            id="filter-name"
            placeholder=${translate('filterName')}
          ></ss-input>
          <ss-button
            @click=${(e: CustomEvent) => {
              this._handleSaveClick(e);
            }}
            text=${translate('saveFilter')}
            ?disabled=${!this.saveButtonIsEnabled}
          ></ss-button>
        </div>
      </div>
    `;
  }
}

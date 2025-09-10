import { html, css, nothing } from 'lit';
import { customElement, query, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { repeat } from 'lit/directives/repeat.js';
import { MobxLitElement } from '@adobe/lit-mobx';
import { msg } from '@lit/localize';

import {
  ListFilterType,
  ListFilter as ListFilterModel,
  ListFilterTimeType,
  TimeContext,
  TextContext,
} from 'api-spec/models/List';

import { api } from '@/lib/Api';
import { appState } from '@/state';
import { SavedListFilter, storage } from '@/lib/Storage';
import { addToast } from '@/lib/Util';
import { NotificationType } from '@ss/ui/components/notification-provider.models';
import { SettingName, TagSuggestions } from 'api-spec/models/Setting';

import { TimeFiltersUpdatedEvent } from '@/components/list-filter/time-filters/time-filters.events';
import { TextFiltersUpdatedEvent } from '@/components/list-filter/text-filters/text-filters.events';
import { ListFilterUpdatedEvent } from './list-filter.events';
import { TagsUpdatedEvent } from '@ss/ui/components/tag-manager.events';
import { TagSuggestionsRequestedEvent } from '@ss/ui/components/tag-input.events';

import { SSInput } from '@ss/ui/components/ss-input';
import '@ss/ui/components/ss-select';
import '@ss/ui/components/tag-manager';
import '@/components/list-filter/time-filters/time-filters';
import '@/components/list-filter/text-filters/text-filters';

import { theme } from '@/styles/theme';

const filterTypeMsgMap: Record<ListFilterType, string> = {
  [ListFilterType.CONTAINS_ALL_OF]: msg('filterType.containsAllOf'),
  [ListFilterType.CONTAINS_ONE_OF]: msg('filterType.containsOneOf'),
};

@customElement('list-filter')
export class ListFilter extends MobxLitElement {
  private minLengthForSuggestion = 1;
  public state = appState;

  static styles = [
    theme,
    css`
      .list-filter {
        padding: 1rem;
      }

      .list-filter.all .filters,
      .tagging.all .tag-rules {
        opacity: 0.3;
        pointer-events: none;
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
  @state() includeAllTagging: boolean = false;
  @state() time: TimeContext = { type: ListFilterTimeType.ALL_TIME };
  @state() text: TextContext[] = [];

  @state() savedFilters: SavedListFilter[] = [];
  @state() saveMode: boolean = false;
  @state() filterName: string = '';
  @state() selectedSavedFilter: string = '';
  @state() lastInput = { value: '', hadResults: true };
  @state() tagSuggestions: string[] = [];

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

  @state() get taggingClasses() {
    return {
      tagging: true,
      all: this.includeAllTagging,
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

  get tagSuggestionsEnabled(): boolean {
    return (
      this.state.listConfig.setting[SettingName.TAG_SUGGESTIONS] !==
      TagSuggestions.DISABLED
    );
  }

  get filter(): ListFilterModel {
    return {
      includeAll: this.includeAll,
      includeUntagged: this.includeUntagged,
      includeAllTagging: this.includeAllTagging,
      tagging: {
        containsOneOf: this.containsOneOf,
        containsAllOf: this.containsAllOf,
      },
      time: this.time,
      text: this.text,
    };
  }

  connectedCallback(): void {
    super.connectedCallback();
    this.sync();
    this.savedFilters = storage.getSavedFilters();
  }

  sync(_reset: boolean = false): void {
    Object.values(ListFilterType).forEach(type => {
      this[type] = this.state.listFilter.tagging[type];
    });
    this.includeUntagged = this.state.listFilter.includeUntagged;
    this.includeAll = this.state.listFilter.includeAll;
    this.includeAllTagging = this.state.listFilter.includeAllTagging;
    if (this.state.listFilter.time) {
      this.time = this.state.listFilter.time;
    }
    if (this.state.listFilter.text) {
      this.text = this.state.listFilter.text;
    }
  }

  private handleIncludeUntaggedChanged() {
    this.includeUntagged = !this.includeUntagged;
  }

  private handleIncludeAllChanged() {
    this.includeAll = !this.includeAll;
  }

  private handleIncludeAllTaggingChanged() {
    this.includeAllTagging = !this.includeAllTagging;
  }

  private handleUpdateClick(_e: CustomEvent): void {
    this.state.setListFilter(this.filter);

    storage.saveActiveFilter(this.state.listFilter);
    this.dispatchEvent(new ListFilterUpdatedEvent({}));
    addToast(msg('Filter updated!'), NotificationType.INFO);
  }

  private async saveFilter() {
    if (!this.saveMode) {
      this.saveMode = true;
      this.filterNameInput.focus();
      return;
    }

    await storage.saveFilter(this.filter, this.filterName);
    this.savedFilters = storage.getSavedFilters();

    this.filterNameInput.clear();
    this.saveMode = false;

    addToast(msg('Filter saved!'), NotificationType.SUCCESS);
  }

  private async handleSaveClick(_e: CustomEvent): Promise<void> {
    await this.saveFilter();
  }

  private handleFilterNameChanged(e: CustomEvent): void {
    this.filterName = e.detail.value;
  }

  private handleFilterNameSubmitted(_e: CustomEvent): void {
    this.saveFilter();
  }

  private handleSavedFilterChanged(_e: Event) {
    this.selectedSavedFilter = this.savedFiltersInput.value;
    const savedFilter = this.savedFilters.find(
      savedFilter => savedFilter.id === this.savedFiltersInput.value,
    );
    if (savedFilter) {
      this[ListFilterType.CONTAINS_ONE_OF] =
        savedFilter.filter.tagging[ListFilterType.CONTAINS_ONE_OF];
      this[ListFilterType.CONTAINS_ALL_OF] =
        savedFilter.filter.tagging[ListFilterType.CONTAINS_ALL_OF];
      this.includeAllTagging = savedFilter.filter.includeAllTagging;
      this.includeUntagged = savedFilter.filter.includeUntagged;
      this.includeAll = savedFilter.filter.includeAll;
      this.time = savedFilter.filter.time;
      this.text = savedFilter.filter.text;
    }
  }

  private handleDeleteSavedFilterClick(_e: Event) {
    if (this.savedFiltersInput.value) {
      storage.deleteSavedFilter(this.savedFiltersInput.value);
      this.savedFiltersInput.value = '';
      this.savedFiltersInput.dispatchEvent(new Event('change'));
    }
    this.savedFilters = storage.getSavedFilters();
    addToast(msg('Filter deleted!'), NotificationType.INFO);
  }

  private handleTimeChanged(e: TimeFiltersUpdatedEvent) {
    this.time = e.detail;
  }

  private handleTextChanged(e: TextFiltersUpdatedEvent) {
    this.text = e.detail.filters;
  }

  private updateTags(type: ListFilterType, tags: string[]) {
    this[type] = tags;
  }

  private async handleTagSuggestionsRequested(e: TagSuggestionsRequestedEvent) {
    const value = e.detail.value;
    if (
      (!this.lastInput.hadResults && value.startsWith(this.lastInput.value)) ||
      !this.tagSuggestionsEnabled
    ) {
      this.tagSuggestions = [];
      return;
    }

    this.lastInput.hadResults = false;
    this.lastInput.value = value;

    let tags: string[] = [];

    if (value.length >= this.minLengthForSuggestion) {
      const result = await api.get<{ tags: string[] }>(`tag/${value}`);
      if (result) {
        tags = result.response.tags;
      }
    }

    if (tags.length || value === '') {
      this.lastInput.hadResults = true;
    }

    this.tagSuggestions = tags;
  }

  render() {
    return html`
      <div class=${classMap(this.classes)}>
        ${this.savedFilters.length
          ? html`
              <div class="saved-filters">
                <select
                  id="saved-filters"
                  @change=${this.handleSavedFilterChanged}
                >
                  <option value="">${msg('Saved filters')}</option>
                  ${repeat(
                    this.savedFilters,
                    filter => filter.id,
                    filter => html`
                      <option value=${filter.id}>${filter.name}</option>
                    `,
                  )}
                </select>

                ${this.selectedSavedFilter
                  ? html`
                      <ss-button
                        @click=${this.handleDeleteSavedFilterClick}
                        text=${msg('Delete filter')}
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
            @change=${this.handleIncludeAllChanged}
          />

          <label for="include-all">${msg('Include all actions')}</label>
        </div>

        <div class="filters">
          <text-filters
            .filters=${this.text}
            @text-filters-updated=${(e: TextFiltersUpdatedEvent) =>
              this.handleTextChanged(e)}
          ></text-filters>

          <fieldset class=${classMap(this.taggingClasses)}>
            <legend>${msg('Tagging')}</legend>

            <div class="all">
              <input
                id="include-all-tagging"
                type="checkbox"
                ?checked=${this.includeAllTagging}
                @change=${this.handleIncludeAllTaggingChanged}
              />

              <label for="include-all-tagging">${msg('Include all')}</label>
            </div>

            <div class="tag-rules">
              ${repeat(
                Object.values(ListFilterType),
                type => type,
                type => html`
                  <fieldset>
                    <legend>${filterTypeMsgMap[type]}</legend>

                    <tag-manager
                      ?enableSuggestions=${this.tagSuggestionsEnabled}
                      @tags-updated=${(e: TagsUpdatedEvent): void => {
                        this.updateTags(type, e.detail.tags);
                      }}
                      @tag-suggestions-requested=${this
                        .handleTagSuggestionsRequested}
                    >
                      <div slot="tags">
                        ${repeat(
                          this[type],
                          tag => tag,
                          tag => html`<data-item>${tag}</data-item>`,
                        )}
                      </div>

                      <div slot="suggestions">
                        ${repeat(
                          this.tagSuggestions,
                          suggestion => suggestion,
                          suggestion =>
                            html`<data-item>${suggestion}</data-item>`,
                        )}
                      </div>
                    </tag-manager>
                  </fieldset>
                `,
              )}
              <div>
                <input
                  id="include-untagged"
                  type="checkbox"
                  ?checked=${this.includeUntagged}
                  @change=${this.handleIncludeUntaggedChanged}
                />

                <label for="include-untagged"
                  >${msg('Include actions without tags')}</label
                >
              </div>
            </div>
          </fieldset>

          <time-filters
            type=${this.time.type}
            date=${this.time.type === ListFilterTimeType.EXACT_DATE
              ? this.time.date
              : ''}
            start=${this.time.type === ListFilterTimeType.RANGE
              ? this.time.start
              : ''}
            end=${this.time.type === ListFilterTimeType.RANGE
              ? this.time.end
              : ''}
            @time-filters-updated=${(e: TimeFiltersUpdatedEvent) =>
              this.handleTimeChanged(e)}
          ></time-filters>
        </div>

        <ss-button
          @click=${(e: CustomEvent) => {
            this.handleUpdateClick(e);
          }}
          text=${msg('Use filter')}
        ></ss-button>

        <div class="save">
          <ss-input
            @input-changed=${(e: CustomEvent) => {
              this.handleFilterNameChanged(e);
            }}
            @input-submitted=${(e: CustomEvent) => {
              this.handleFilterNameSubmitted(e);
            }}
            id="filter-name"
            placeholder=${msg('Filter name')}
          ></ss-input>

          <ss-button
            @click=${(e: CustomEvent) => {
              this.handleSaveClick(e);
            }}
            text=${msg('Save filter')}
            ?disabled=${!this.saveButtonIsEnabled}
          ></ss-button>
        </div>
      </div>
    `;
  }
}

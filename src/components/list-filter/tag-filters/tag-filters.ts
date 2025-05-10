import { html } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { repeat } from 'lit/directives/repeat.js';
import { msg } from '@lit/localize';

import { ListFilterType } from 'api-spec/models/List';

import { api } from '@/lib/Api';

import {
  FilterTagsUpdatedEvent,
  IncludeUntaggedUpdatedEvent,
} from '@/lib/Event';
import { TagsUpdatedEvent } from '@/components/tag-manager/tag-manager.events';

import '@/components/tag-manager/tag-manager';
import { MobxLitElement } from '@adobe/lit-mobx';
import { SettingName, TagSuggestions } from 'api-spec/models/Setting';
import { appState } from '@/state';
import { TagSuggestionsRequestedEvent } from '@/components/tag-manager/tag-input/tag-input.events';

const filterTypeMsgMap: Record<ListFilterType, string> = {
  [ListFilterType.CONTAINS_ALL_OF]: msg('filterType.containsAllOf'),
  [ListFilterType.CONTAINS_ONE_OF]: msg('filterType.containsOneOf'),
};

@customElement('tag-filters')
export class TagFilters extends MobxLitElement {
  private minLengthForSuggestion = 1;
  private state = appState;

  @property({ type: Array }) [ListFilterType.CONTAINS_ONE_OF]: string[] = [];
  @property({ type: Array }) [ListFilterType.CONTAINS_ALL_OF]: string[] = [];
  @property({ type: Boolean }) includeUntagged: boolean = false;

  @state() lastInput = { value: '', hadResults: true };
  @state() tagSuggestions: string[] = [];

  get tagSuggestionsEnabled(): boolean {
    return (
      this.state.listConfig.setting[SettingName.TAG_SUGGESTIONS] !==
      TagSuggestions.DISABLED
    );
  }

  private _handleIncludeUntaggedChanged() {
    this.dispatchEvent(new IncludeUntaggedUpdatedEvent({}));
  }

  private handleTagsUpdated(type: ListFilterType, tags: string[]) {
    this.dispatchEvent(new FilterTagsUpdatedEvent({ type, tags }));
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
      <fieldset>
        <legend>${msg('tagging')}</legend>

        ${repeat(
          Object.values(ListFilterType),
          type => type,
          type => html`
            <fieldset>
              <legend>${filterTypeMsgMap[type]}</legend>
              <tag-manager
                ?enableSuggestions=${this.tagSuggestionsEnabled}
                @tags-updated=${this.handleTagsUpdated}
                @tag-suggestions-requested=${this.handleTagSuggestionsRequested}
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
                    suggestion => html`<data-item>${suggestion}</data-item>`,
                  )}
                </div>
              </tag-manager>
            </fieldset>
          `,
        )}
        <div>
          <input
            id="include-unchanged"
            type="checkbox"
            ?checked=${this.includeUntagged}
            @change=${this._handleIncludeUntaggedChanged}
          />
          <label for="include-unchanged"
            >${msg('Include actions without tags')}</label
          >
        </div>
      </fieldset>
    `;
  }
}

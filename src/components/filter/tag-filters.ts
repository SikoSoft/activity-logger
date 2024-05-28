import { translate } from '@/util/strings';
import { html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { repeat } from 'lit/directives/repeat.js';

import '@/components/tag/tag-manager';
import { ListFilterType } from '@/models/ListFilter';
import {
  FilterTagsUpdatedEvent,
  IncludeUntaggedUpdatedEvent,
} from '@/lib/Event';

@customElement('tag-filters')
export class TagFilters extends LitElement {
  @property({ type: Array }) [ListFilterType.CONTAINS_ONE_OF]: string[] = [];
  @property({ type: Array }) [ListFilterType.CONTAINS_ALL_OF]: string[] = [];
  @property({ type: Boolean }) includeUntagged: boolean = false;

  private _handleIncludeUntaggedChanged() {
    //this.includeUntagged = !this.includeUntagged;
    this.dispatchEvent(new IncludeUntaggedUpdatedEvent({}));
  }

  private _handleTagsUpdated(type: ListFilterType, tags: string[]) {
    this.dispatchEvent(new FilterTagsUpdatedEvent({ type, tags }));
  }

  render() {
    return html`
      <fieldset>
        <legend>${translate('tagging')}</legend>

        ${repeat(
          Object.values(ListFilterType),
          type => type,
          type => html`
            <fieldset>
              <legend>${translate(type)}</legend>
              <tag-manager
                .tags=${this[type]}
                @updated=${(e: CustomEvent) => {
                  this._handleTagsUpdated(type, e.detail.tags);
                }}
              ></tag-manager>
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
          <label for="include-unchanged">${translate('includeUntagged')}</label>
        </div>
      </fieldset>
    `;
  }
}

import { appState } from '@/state';
import { theme } from '@/styles/theme';
import { translate } from '@/util/strings';
import { MobxLitElement } from '@adobe/lit-mobx';
import { css, html, LitElement } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';

import '@/components/tag/tag-manager';
import { SelectChangedEvent } from '@/lib/Event';

export enum TaggingType {
  BULK_ADD_TAGS = 'bulkAddTags',
  BULK_REMOVE_TAGS = 'bulkRemoveTags',
  BULK_SET_TAGS = 'bulkSetTags',
}

@customElement('bulk-manager')
export class BulkManager extends MobxLitElement {
  private state = appState;

  static styles = [
    theme,
    css`
      .bulk-manager {
        position: sticky;
        top: 0;
        left: 0;
        padding: 1rem;
        box-shadow: 0 0 10px #000;
        display: none;

        &.shown {
          display: block;
        }
      }

      .number-selected {
        text-align: center;
        color: #555;
        padding: 1rem;
      }
    `,
  ];

  @state() taggingType: TaggingType = TaggingType.BULK_ADD_TAGS;
  @state() tagValue: string = '';
  @state() tags: string[] = [];

  @state()
  get classes() {
    return {
      box: true,
      'bulk-manager': true,
      shown: this.state.selectedActions.length > 0,
    };
  }

  private _handleTaggingTypeChanged(e: SelectChangedEvent) {
    console.log('handleTaggingTypeChanged', e);
    const taggingType = e.detail.value as TaggingType;
    this.taggingType = taggingType;
  }

  private _handlePerformOperation() {
    console.log('perform operation', this.taggingType, this.tags);
  }

  private _handleTagsUpdated(e: CustomEvent) {
    console.log('handle tags updated');
    this.tags = e.detail.tags;
  }

  render() {
    return html`
      <div class=${classMap(this.classes)}>
        <fieldset>
          <legend>${translate('tagging')}</legend>

          <ss-select
            selected=${this.taggingType}
            @select-changed=${this._handleTaggingTypeChanged}
            .options=${Object.values(TaggingType).map(type => ({
              value: type,
              label: translate(type),
            }))}
          ></ss-select>

          <tag-manager
            value=${this.tagValue}
            .tags=${this.tags}
            @tags-updated=${this._handleTagsUpdated}
          ></tag-manager>
        </fieldset>

        <div class="number-selected">
          ${translate(
            `numItem${this.state.selectedActions.length > 1 ? 's' : ''}Selected`,
          ).replace('{x}', this.state.selectedActions.length.toString())}
        </div>

        <ss-button
          text=${translate('performOperation')}
          @click=${this._handlePerformOperation}
        ></ss-button>
      </div>
    `;
  }
}

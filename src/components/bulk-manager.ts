import { appState } from '@/state';
import { theme } from '@/styles/theme';
import { translate } from '@/util/strings';
import { MobxLitElement } from '@adobe/lit-mobx';
import { css, html, LitElement } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';

import '@/components/tag/tag-manager';
import { SelectChangedEvent } from '@/lib/Event';
import { api } from '../lib/Api';
import { BulkOperation, OperationType } from 'api-spec/models/Operation';

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

      .number-selected,
      .select-all {
        text-align: center;
        color: #555;
        padding: 1rem;
      }
    `,
  ];

  @state() taggingType: OperationType = OperationType.ADD_TAGS;
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
    const taggingType = e.detail.value as OperationType;
    this.taggingType = taggingType;
  }

  private _handlePerformOperation() {
    console.log('perform operation', this.taggingType, this.tags);

    const json = api.post<any, BulkOperation>('operation', {
      operation: { tags: this.tags, type: this.taggingType },
      actions: this.state.selectedActions,
    });

    this.state.setSelectedActions([]);
    this.state.setSelectMode(false);
    this.state.addToast(translate('operationPerformed'));
  }

  private _handleTagsUpdated(e: CustomEvent) {
    console.log('handle tags updated');
    this.tags = e.detail.tags;
  }

  private _handleSelectAll() {
    console.log('handleSelectAll');
    this.state.selectAll();
  }

  render() {
    return html`
      <div class=${classMap(this.classes)}>
        <fieldset>
          <legend>${translate('tagging')}</legend>

          <ss-select
            selected=${this.taggingType}
            @select-changed=${this._handleTaggingTypeChanged}
            .options=${Object.values(OperationType).map(type => ({
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

        <div class="select-all">
          <ss-button
            text=${translate('selectAll')}
            @click=${this._handleSelectAll}
          ></ss-button>
        </div>

        <ss-button
          text=${translate('performOperation')}
          @click=${this._handlePerformOperation}
        ></ss-button>
      </div>
    `;
  }
}

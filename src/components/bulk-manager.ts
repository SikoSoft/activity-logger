import { MobxLitElement } from '@adobe/lit-mobx';
import { css, html, nothing } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';

import { BulkOperation, OperationType } from 'api-spec/models/Operation';

import { api } from '@/lib/Api';
import { appState } from '@/state';
import { translate } from '@/util/strings';

import { SelectChangedEvent } from '@/events/select-changed';
import { OperationPerformedEvent } from '@/events/operation-performed';

import '@/components/tag/tag-manager';

import { theme } from '@/styles/theme';

const taggingOperations = [
  OperationType.ADD_TAGS,
  OperationType.REMOVE_TAGS,
  OperationType.REPLACE_TAGS,
];

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

  @state() operationType: OperationType = OperationType.ADD_TAGS;
  @state() tagValue: string = '';
  @state() tags: string[] = [];

  @state()
  get showTagManager(): boolean {
    return taggingOperations.includes(this.operationType);
  }

  @state()
  get classes() {
    return {
      box: true,
      'bulk-manager': true,
      shown: this.state.selectedActions.length > 0,
    };
  }

  private _handleTypeChanged(e: SelectChangedEvent<string>) {
    const type = e.detail.value as OperationType;
    this.operationType = type;
  }

  private async _handlePerformOperation() {
    await api.post<any, BulkOperation>('operation', {
      operation: { tags: this.tags, type: this.operationType },
      actions: this.state.selectedActions,
    });

    this.state.setSelectedActions([]);
    this.state.setSelectMode(false);
    this.state.addToast(translate('operationPerformed'));

    this.dispatchEvent(
      new OperationPerformedEvent({
        type: this.operationType,
        actions: this.state.selectedActions,
      }),
    );
  }

  private _handleTagsUpdated(e: CustomEvent) {
    this.tags = e.detail.tags;
  }

  private _handleSelectAll() {
    this.state.toggleSelectAll();
  }

  render() {
    return html`
      <div class=${classMap(this.classes)}>
        <ss-select
          selected=${this.operationType}
          @select-changed=${this._handleTypeChanged}
          .options=${Object.values(OperationType).map(type => ({
            value: type,
            label: translate(type),
          }))}
        ></ss-select>

        ${this.showTagManager
          ? html`
              <tag-manager
                value=${this.tagValue}
                .tags=${this.tags}
                @tags-updated=${this._handleTagsUpdated}
              ></tag-manager>
            `
          : nothing}

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

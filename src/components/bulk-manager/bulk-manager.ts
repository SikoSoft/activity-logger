import { MobxLitElement } from '@adobe/lit-mobx';
import { css, html, nothing } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { msg, str } from '@lit/localize';

import { BulkOperation, OperationType } from 'api-spec/models/Operation';

import { api } from '@/lib/Api';
import { appState } from '@/state';

import { SelectChangedEvent } from '@ss/ui/events/select-changed';
import { OperationPerformedEvent } from './bulk-manager.events';
import { TagsUpdatedEvent } from '@ss/ui/components/tag-manager.events';

import '@ss/ui/components/ss-button';
import '@ss/ui/components/tag-manager';

import { theme } from '@/styles/theme';
import { operationTypeMsgMap, taggingOperations } from './bulk-manager.models';
import { addToast } from '@/lib/Util';
import { NotificationType } from '@ss/ui/components/notification-provider.models';
import { repeat } from 'lit/directives/repeat.js';
import { SettingName, TagSuggestions } from 'api-spec/models/Setting';
import { TagSuggestionsRequestedEvent } from '@ss/ui/components/tag-input.events';

@customElement('bulk-manager')
export class BulkManager extends MobxLitElement {
  private minLengthForSuggestion = 1;
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
  @state() loading: boolean = false;
  @state() lastInput = { value: '', hadResults: true };
  @state() tagSuggestions: string[] = [];

  get tagSuggestionsEnabled(): boolean {
    return (
      this.state.listConfig.setting[SettingName.TAG_SUGGESTIONS] !==
      TagSuggestions.DISABLED
    );
  }

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

  private handleTypeChanged(e: SelectChangedEvent<string>) {
    const type = e.detail.value as OperationType;
    this.operationType = type;
  }

  private async handlePerformOperation() {
    await api.post<any, BulkOperation>('operation', {
      operation: { tags: this.tags, type: this.operationType },
      actions: this.state.selectedActions,
    });

    this.state.setSelectedActions([]);
    this.state.setSelectMode(false);
    addToast(
      msg('The operation has been performed successfully.'),
      NotificationType.INFO,
    );

    this.dispatchEvent(
      new OperationPerformedEvent({
        type: this.operationType,
        actions: this.state.selectedActions,
      }),
    );
  }

  private handleTagsUpdated(e: TagsUpdatedEvent) {
    this.tags = e.detail.tags;
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

  private handleSelectAll() {
    this.state.toggleSelectAll();
  }

  render() {
    return html`
      <div class=${classMap(this.classes)}>
        <ss-select
          selected=${this.operationType}
          @select-changed=${this.handleTypeChanged}
          .options=${Object.values(OperationType).map(type => ({
            value: type,
            label: operationTypeMsgMap[type],
          }))}
        ></ss-select>

        ${this.showTagManager
          ? html`
              <tag-manager
                ?enableSuggestions=${this.tagSuggestionsEnabled}
                value=${this.tagValue}
                @tags-updated=${this.handleTagsUpdated}
                @tag-suggestions-requested=${this.handleTagSuggestionsRequested}
              >
                <div slot="tags">
                  ${repeat(
                    this.tags,
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
            `
          : nothing}

        <div class="number-selected">
          ${this.state.selectedActions.length === 1
            ? msg('1 item selected')
            : msg(
                str`${this.state.selectedActions.length.toString()} items selected`,
              )}
        </div>

        <div class="select-all">
          <ss-button
            text=${msg('Select all')}
            @click=${this.handleSelectAll}
          ></ss-button>
        </div>

        <ss-button
          text=${msg('Perform operation')}
          @click=${this.handlePerformOperation}
        ></ss-button>
      </div>
    `;
  }
}

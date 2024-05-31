import { translate } from '@/util/strings';
import { html, LitElement, nothing } from 'lit';
import { customElement, property, query, state } from 'lit/decorators.js';

import '@/components/tag/tag-manager';
import { ListFilterTimeType, TimeContext } from 'api-spec/models/List';
import { SelectChangedEvent, TimeFiltersUpdatedEvent } from '@/lib/Event';
import { InputType } from '@/models/Input';
import { dateString } from '@/util/time';
import { SSInput } from '../ss-input';

@customElement('time-filters')
export class TimeFilters extends LitElement {
  @property() timeStr: string = '';

  @state() time: TimeContext = {
    type: ListFilterTimeType.ALL_TIME,
  };

  @property({ reflect: true }) type: ListFilterTimeType =
    ListFilterTimeType.ALL_TIME;
  @property({ reflect: true }) date: string = '';
  @property({ reflect: true }) start: string = '';
  @property({ reflect: true }) end: string = '';

  @query('#date') dateNode!: SSInput;
  @query('#start') startNode!: SSInput;
  @query('#end') endNode!: SSInput;

  connectedCallback(): void {
    super.connectedCallback();

    if (!this.date) {
      this.date = dateString(new Date());
    }

    if (!this.start) {
      this.start = dateString(new Date(new Date().getTime() - 86400000));
    }

    if (!this.end) {
      this.end = dateString(new Date());
    }
  }

  private _handleTypeChanged(e: SelectChangedEvent) {
    this.type = e.detail.value as ListFilterTimeType;
    this._sendUpdatedEvent();
  }

  private _handleDateChanged(e: CustomEvent) {
    this.date = e.detail.value;
    this._sendUpdatedEvent();
  }

  private _handleStartChanged(e: CustomEvent) {
    this.start = e.detail.value;
    this._sendUpdatedEvent();
  }

  private _handleEndChanged(e: CustomEvent) {
    this.end = e.detail.value;
    this._sendUpdatedEvent();
  }

  private _sendUpdatedEvent(): void {
    this.dispatchEvent(new TimeFiltersUpdatedEvent(this._mapContextFromType()));
  }

  private _mapContextFromType(): TimeContext {
    switch (this.type) {
      case ListFilterTimeType.ALL_TIME:
        return {
          type: ListFilterTimeType.ALL_TIME,
        };
      case ListFilterTimeType.EXACT_DATE:
        return {
          type: ListFilterTimeType.EXACT_DATE,
          date: this.date,
        };
      case ListFilterTimeType.RANGE:
        return {
          type: ListFilterTimeType.RANGE,
          start: this.start,
          end: this.end,
        };
    }
  }

  render() {
    return html`
      <fieldset>
        <legend>${translate('time')}</legend>
        <ss-select
          selected=${this.type}
          @select-changed=${(e: SelectChangedEvent) => {
            this._handleTypeChanged(e);
          }}
          .options=${Object.values(ListFilterTimeType).map(type => ({
            value: type,
            label: translate(type),
          }))}
        ></ss-select>

        <div>
          ${this.type === ListFilterTimeType.EXACT_DATE
            ? html`
                <ss-input
                  id="date"
                  @action-input-changed=${this._handleDateChanged}
                  type=${InputType.DATE}
                  value=${this.date}
                ></ss-input>
              `
            : this.type === ListFilterTimeType.RANGE
              ? html`
                  <ss-input
                    id="start"
                    @action-input-changed=${this._handleStartChanged}
                    type=${InputType.DATE}
                    value=${this.start}
                  ></ss-input>
                  <ss-input
                    id="end"
                    @action-input-changed=${this._handleEndChanged}
                    type=${InputType.DATE}
                    value=${this.end}
                  ></ss-input>
                `
              : nothing}
        </div>
      </fieldset>
    `;
  }
}

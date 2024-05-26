import { translate } from '@/util/strings';
import { html, LitElement, nothing } from 'lit';
import { customElement, property, query, state } from 'lit/decorators.js';
import { repeat } from 'lit/directives/repeat.js';

import '@/components/tag/tag-manager';
import {
  AllTimeContext,
  ListFilterTimeType,
  ListFilterType,
  TimeContext,
} from '@/models/ListFilter';
import {
  FilterTagsUpdatedEvent,
  IncludeUntaggedUpdatedEvent,
  SelectChangedEvent,
  TimeFiltersUpdatedEvent,
} from '@/lib/Event';
import { InputType } from '@/models/Input';
import { SSSelect } from '../ss-select';

@customElement('time-filters')
export class TimeFilters extends LitElement {
  @property({ type: Object }) time: TimeContext = {
    type: ListFilterTimeType.ALL_TIME,
  };

  @state() type: ListFilterTimeType = ListFilterTimeType.ALL_TIME;
  @state() date: Date = new Date();
  @state() start: Date = new Date();
  @state() end: Date = new Date();

  @query('#date') dateNode!: SSSelect;
  @query('#start') startNode!: SSSelect;
  @query('#end') endNode!: SSSelect;

  connectedCallback(): void {
    super.connectedCallback();

    //console.log('initialTime', this.initialTime);
  }

  private _handleTypeChanged(e: SelectChangedEvent) {
    console.log('handleTypeChanged', e.detail);

    this.type = e.detail.value as ListFilterTimeType;

    this._sendUpdatedEvent();
  }

  private _handleDateChanged(e: CustomEvent) {
    console.log('_handleDateChanged', e);
    this.date = this._convertTimeString(this.dateNode.value);
    this._sendUpdatedEvent();
  }

  private _handleStartChanged(e: CustomEvent) {
    console.log('_handleStartChanged', e);
    this.start = this._convertTimeString(this.startNode.value);
    this._sendUpdatedEvent();
  }

  private _handleEndChanged(e: CustomEvent) {
    console.log('_handleEndChanged', e);
    this.end = this._convertTimeString(this.endNode.value);
    this._sendUpdatedEvent();
  }

  private _convertTimeString(dateStr: string): Date {
    return new Date(dateStr);
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
          @select-changed=${(e: SelectChangedEvent) => {
            this._handleTypeChanged(e);
          }}
          .options=${Object.values(ListFilterTimeType).map(type => ({
            value: type,
            label: translate(type),
          }))}
        ></ss-select>

        <div>
          ${this.time.type === ListFilterTimeType.EXACT_DATE
            ? html`
                <ss-input
                  id="date"
                  @action-input-changed=${this._handleDateChanged}
                  type=${InputType.DATETIME_LOCAL}
                ></ss-input>
              `
            : this.time.type === ListFilterTimeType.RANGE
              ? html`
                  <ss-input
                    id="start"
                    @action-input-changed=${this._handleStartChanged}
                    type=${InputType.DATETIME_LOCAL}
                  ></ss-input>
                  <ss-input
                    id="end"
                    @action-input-changed=${this._handleEndChanged}
                    type=${InputType.DATETIME_LOCAL}
                  ></ss-input>
                `
              : nothing}
        </div>
      </fieldset>
    `;
  }
}

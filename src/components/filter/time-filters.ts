import { translate } from '@/util/strings';
import { html, LitElement, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
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

@customElement('time-filters')
export class TimeFilters extends LitElement {
  @property({ type: Object }) time: TimeContext = {
    type: ListFilterTimeType.ALL_TIME,
  };

  private _handleTypeChanged(e: SelectChangedEvent) {
    console.log('handleTypeChanged', e.detail);

    const type = e.detail.value as ListFilterTimeType;
    const context = this._mapContextFromType(type);

    this.dispatchEvent(new TimeFiltersUpdatedEvent(context));
  }

  private _mapContextFromType(type: ListFilterTimeType): TimeContext {
    switch (type) {
      case ListFilterTimeType.ALL_TIME:
        return {
          type: ListFilterTimeType.ALL_TIME,
        };
      case ListFilterTimeType.EXACT_DATE:
        return {
          type: ListFilterTimeType.EXACT_DATE,
          date: new Date(),
        };
      case ListFilterTimeType.RANGE:
        return {
          type: ListFilterTimeType.RANGE,
          start: new Date(),
          end: new Date(),
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
            ? html` <ss-input type=${InputType.DATETIME_LOCAL}></ss-input> `
            : this.time.type === ListFilterTimeType.RANGE
              ? html`
                  <ss-input type=${InputType.DATETIME_LOCAL}></ss-input>
                  <ss-input type=${InputType.DATETIME_LOCAL}></ss-input>
                `
              : nothing}
        </div>
      </fieldset>
    `;
  }
}

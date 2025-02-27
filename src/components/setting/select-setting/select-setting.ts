import { css, html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { localized, msg } from '@lit/localize';

import { theme } from '@/styles/theme';

import '@ss/ui/components/ss-select';
import {
  SelectSettingProp,
  selectSettingProps,
  SelectSettingProps,
} from './select-setting.models';
import { SelectChangedEvent } from '@ss/ui/events/select-changed';
import { SettingUpdatedEvent } from '@/events/setting-updated';

@customElement('select-setting')
@localized()
export class SelectSetting extends LitElement {
  @property()
  [SelectSettingProp.NAME]: SelectSettingProps[SelectSettingProp.NAME] =
    selectSettingProps[SelectSettingProp.NAME].default;

  @property()
  [SelectSettingProp.VALUE]: SelectSettingProps[SelectSettingProp.VALUE] =
    selectSettingProps[SelectSettingProp.VALUE].default;

  @property({ type: Array })
  [SelectSettingProp.OPTIONS]: SelectSettingProps[SelectSettingProp.OPTIONS] =
    selectSettingProps[SelectSettingProp.OPTIONS].default;

  static styles = [
    theme,
    css`
      .select-setting {
        padding: 1rem;
      }
    `,
  ];

  private _handleSelectChanged(e: SelectChangedEvent<string>) {
    this.dispatchEvent(
      new SettingUpdatedEvent<typeof this.value>({
        name: this.name,
        value: e.detail.value,
      }),
    );
  }

  render() {
    return html`
      <div class="select-setting">
        <label>${this.name}</label>
        <ss-select
          @select-changed=${this._handleSelectChanged}
          selected=${this.value}
          .options=${this.options.map(option => ({
            label: option,
            value: option,
          }))}
        ></ss-select>
      </div>
    `;
  }
}

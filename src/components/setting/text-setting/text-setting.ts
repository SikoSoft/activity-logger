import { css, html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { localized, msg } from '@lit/localize';

import { theme } from '@/styles/theme';

import '@ss/ui/components/ss-toggle';
import { InputChangedEvent } from '@ss/ui/events/input-changed';
import { SettingUpdatedEvent } from '@/events/setting-updated';
import {
  TextSettingProp,
  TextSettingProps,
  textSettingProps,
} from './text-setting.models';

@customElement('text-setting')
@localized()
export class TextSetting extends LitElement {
  @property()
  [TextSettingProp.NAME]: TextSettingProps[TextSettingProp.NAME] =
    textSettingProps[TextSettingProp.NAME].default;

  @property()
  [TextSettingProp.VALUE]: TextSettingProps[TextSettingProp.VALUE] =
    textSettingProps[TextSettingProp.VALUE].default;

  static styles = [
    theme,
    css`
      .text-setting {
        padding: 1rem;
      }
    `,
  ];

  private _handleInputChanged(e: InputChangedEvent) {
    this.dispatchEvent(
      new SettingUpdatedEvent<typeof this.value>({
        name: this.name,
        value: e.detail.value,
      }),
    );
  }

  render() {
    return html`
      <div class="text-setting">
        <label>${this.name}</label>
        <ss-input
          @input-changed=${this._handleInputChanged}
          value=${this.value}
        ></ss-input>
      </div>
    `;
  }
}

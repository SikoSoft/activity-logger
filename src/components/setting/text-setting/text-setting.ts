import { css, html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import {
  TextSettingProp,
  TextSettingProps,
  textSettingProps,
} from './text-setting.models';

import { InputChangedEvent } from '@ss/ui/components/ss-input.events';
import { SettingUpdatedEvent } from '@/events/setting-updated';

import '@ss/ui/components/ss-toggle';

import { theme } from '@/styles/theme';

@customElement('text-setting')
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

  private handleInputChanged(e: InputChangedEvent) {
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
          @input-changed=${this.handleInputChanged}
          value=${this.value}
        ></ss-input>
      </div>
    `;
  }
}

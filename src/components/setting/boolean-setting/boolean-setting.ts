import { css, html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { localized } from '@lit/localize';

import { theme } from '@/styles/theme';

import '@ss/ui/components/ss-toggle';
import {
  BooleanSettingProp,
  booleanSettingProps,
  BooleanSettingProps,
} from './boolean-setting.models';
import { ToggleChangedEvent } from '@ss/ui/events/toggle-changed';
import { SettingUpdatedEvent } from '@/events/setting-updated';

@customElement('boolean-setting')
@localized()
export class BooleanSetting extends LitElement {
  @property()
  [BooleanSettingProp.NAME]: BooleanSettingProps[BooleanSettingProp.NAME] =
    booleanSettingProps[BooleanSettingProp.NAME].default;

  @property({ type: Boolean })
  [BooleanSettingProp.VALUE]: BooleanSettingProps[BooleanSettingProp.VALUE] =
    booleanSettingProps[BooleanSettingProp.VALUE].default;

  static styles = [
    theme,
    css`
      .boolean-setting {
        padding: 1rem;
      }
    `,
  ];

  private handleToggleChanged(e: ToggleChangedEvent) {
    this.dispatchEvent(
      new SettingUpdatedEvent<typeof this.value>({
        name: this.name,
        value: e.detail.on,
      }),
    );
  }

  render() {
    return html`
      <div class="boolean-setting">
        <label>${this.name}</label>
        <ss-toggle
          on=${this.value}
          @toggle-changed=${this.handleToggleChanged}
        ></ss-toggle>
      </div>
    `;
  }
}

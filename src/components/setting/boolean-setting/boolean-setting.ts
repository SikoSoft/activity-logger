import { css, html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { localized, msg } from '@lit/localize';

import { theme } from '@/styles/theme';

import '@ss/ui/components/ss-toggle';
import {
  BooleanSettingProp,
  booleanSettingProps,
  BooleanSettingProps,
} from './boolean-setting.models';

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

  render() {
    return html`
      <div class="boolean-setting">
        <label>${this.name}</label>
        <ss-toggle on=${this.value}></ss-toggle>
      </div>
    `;
  }
}

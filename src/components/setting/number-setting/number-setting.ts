import { css, html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { localized, msg } from '@lit/localize';

import { theme } from '@/styles/theme';

import '@ss/ui/components/ss-toggle';
import {
  NumberSettingProp,
  numberSettingProps,
  NumberSettingProps,
} from './number-setting.models';

@customElement('number-setting')
@localized()
export class NumberSetting extends LitElement {
  @property()
  [NumberSettingProp.NAME]: NumberSettingProps[NumberSettingProp.NAME] =
    numberSettingProps[NumberSettingProp.NAME].default;

  @property({ type: Number })
  [NumberSettingProp.VALUE]: NumberSettingProps[NumberSettingProp.VALUE] =
    numberSettingProps[NumberSettingProp.VALUE].default;

  @property({ type: Number })
  [NumberSettingProp.MIN]: NumberSettingProps[NumberSettingProp.MIN] =
    numberSettingProps[NumberSettingProp.MIN].default;

  @property({ type: Number })
  [NumberSettingProp.MAX]: NumberSettingProps[NumberSettingProp.MAX] =
    numberSettingProps[NumberSettingProp.MAX].default;

  @property({ type: Number })
  [NumberSettingProp.STEP]: NumberSettingProps[NumberSettingProp.STEP] =
    numberSettingProps[NumberSettingProp.STEP].default;

  static styles = [
    theme,
    css`
      .number-setting {
        padding: 1rem;
      }
    `,
  ];

  render() {
    return html`
      <div>
        <label>${this.name}</label>
        <input type="number" value=${this.value} min=${this.min} max=${this.max} step=${this.step}></input>
      </div>
    `;
  }
}

import { css, html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
import { localized, msg } from '@lit/localize';

import { appState } from '@/state';

import { theme } from '@/styles/theme';

import '@/components/setting/boolean-setting/boolean-setting';
import '@/components/setting/number-setting/number-setting';
import '@/components/setting/select-setting/select-setting';
import '@/components/setting/text-setting/text-setting';
import { Setting, settingsConfig, ControlType } from 'api-spec/models/Setting';
import { ifDefined } from 'lit/directives/if-defined.js';

@customElement('setting-form')
@localized()
export class SettingForm extends LitElement {
  renderSetting(setting: Setting) {
    console.log(setting);
    switch (setting.control.type) {
      case ControlType.BOOLEAN:
        return html`<boolean-setting
          name=${setting.name}
          ?value=${setting.value}
        ></boolean-setting>`;
      case ControlType.NUMBER:
        return html`<number-setting
          name=${setting.name}
          value=${setting.value}
          min=${ifDefined(setting.control.min)}
          max=${ifDefined(setting.control.max)}
          step=${ifDefined(setting.control.step)}
        ></number-setting>`;
      case ControlType.SELECT:
        return html`<select-setting
          name=${setting.name}
          value=${setting.value}
          .options=${setting.control.options}
        ></select-setting>`;
      case ControlType.TEXT:
        return html`<text-setting
          name=${setting.name}
          value=${setting.value}
        ></text-setting>`;
    }
  }

  render() {
    return html`
      <form>
        ${Object.values(settingsConfig).map(setting =>
          this.renderSetting(setting),
        )}
      </form>
    `;
  }
}

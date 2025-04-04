import { html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { localized } from '@lit/localize';
import { ifDefined } from 'lit/directives/if-defined.js';

import {
  Setting,
  settingsConfig,
  ControlType,
  SettingConfig,
} from 'api-spec/models/Setting';

import { storage } from '@/lib/Storage';

import '@/components/setting/boolean-setting/boolean-setting';
import '@/components/setting/number-setting/number-setting';
import '@/components/setting/select-setting/select-setting';
import '@/components/setting/text-setting/text-setting';

import { SettingUpdatedEvent } from '@/events/setting-updated';
import {
  SettingFormProp,
  settingFormProps,
  SettingFormProps,
} from './setting-form.models';
import { MobxLitElement } from '@adobe/lit-mobx';
import { appState } from '@/state';

@customElement('setting-form')
@localized()
export class SettingForm extends MobxLitElement {
  public state = appState;

  @property()
  [SettingFormProp.LIST_CONFIG_ID]: SettingFormProps[SettingFormProp.LIST_CONFIG_ID] =
    settingFormProps[SettingFormProp.LIST_CONFIG_ID].default;

  renderSetting(setting: SettingConfig) {
    switch (setting.control.type) {
      /*
      case ControlType.BOOLEAN:
        return html`<boolean-setting
          name=${setting.name}
          ?value=${setting.value}
          @setting-updated=${(e: SettingUpdatedEvent<boolean>) => {
            this._updateSetting({ name: setting.name, value: e.detail });
          }}
        ></boolean-setting>`;
        */
      case ControlType.NUMBER:
        return html`<number-setting
          name=${setting.name}
          value=${this.state.listConfig.setting[setting.name]}
          min=${ifDefined(setting.control.min)}
          max=${ifDefined(setting.control.max)}
          step=${ifDefined(setting.control.step)}
          @setting-updated=${this._handleSettingUpdated}
        ></number-setting>`;
      case ControlType.SELECT:
        return html`<select-setting
          name=${setting.name}
          value=${this.state.listConfig.setting[setting.name]}
          .options=${setting.control.options}
          @setting-updated=${this._handleSettingUpdated}
        ></select-setting>`;
      case ControlType.TEXT:
        return html`<text-setting
          name=${setting.name}
          value=${this.state.listConfig.setting[setting.name]}
          @setting-updated=${this._handleSettingUpdated}
        ></text-setting>`;
    }
  }

  private _handleSettingUpdated<SettingType>(
    event: SettingUpdatedEvent<SettingType>,
  ) {
    const setting = event.detail as Setting;
    this.state.setSetting(setting);
    storage.saveSetting(this[SettingFormProp.LIST_CONFIG_ID], setting);
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

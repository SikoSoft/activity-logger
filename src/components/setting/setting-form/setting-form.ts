import { html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import { MobxLitElement } from '@adobe/lit-mobx';

import { translate } from '@/lib/Localization';
import {
  Setting,
  settingsConfig,
  ControlType,
  SettingConfig,
} from 'api-spec/models/Setting';
import { appState } from '@/state';
import { addToast } from '@/lib/Util';
import { Debouncer } from '@/lib/Debouncer';
import { storage } from '@/lib/Storage';
import {
  SettingFormProp,
  settingFormProps,
  SettingFormProps,
} from './setting-form.models';
import { NotificationType } from '@ss/ui/components/notification-provider.models';

import '@/components/setting/boolean-setting/boolean-setting';
import '@/components/setting/number-setting/number-setting';
import '@/components/setting/select-setting/select-setting';
import '@/components/setting/text-setting/text-setting';

import { SettingUpdatedEvent } from '@/events/setting-updated';

@customElement('setting-form')
export class SettingForm extends MobxLitElement {
  public state = appState;
  private saveDebouncer = new Debouncer(300);

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
          @setting-updated=${this.handleSettingUpdated}
        ></number-setting>`;
      case ControlType.SELECT:
        return html`<select-setting
          name=${setting.name}
          value=${this.state.listConfig.setting[setting.name]}
          .options=${setting.control.options}
          @setting-updated=${this.handleSettingUpdated}
        ></select-setting>`;
      case ControlType.TEXT:
        return html`<text-setting
          name=${setting.name}
          value=${this.state.listConfig.setting[setting.name]}
          @setting-updated=${this.handleSettingUpdated}
        ></text-setting>`;
    }
  }

  private async handleSettingUpdated<SettingType>(
    event: SettingUpdatedEvent<SettingType>,
  ) {
    this.saveDebouncer.cancel();
    this.saveDebouncer.debounce(async () => {
      const setting = event.detail as Setting;
      const isOk = await storage.saveSetting(
        this[SettingFormProp.LIST_CONFIG_ID],
        setting,
      );
      if (isOk) {
        this.state.setSetting(setting);
        addToast(translate('settingUpdated'), NotificationType.SUCCESS);
        return;
      }

      addToast(translate('failedToUpdateSetting'), NotificationType.ERROR);
    });
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

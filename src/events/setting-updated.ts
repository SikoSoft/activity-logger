export const settingUpdatedEventName = 'setting-updated';

export interface SettingUpdatedEventPayload<SettingType> {
  name: string;
  value: SettingType;
}

export class SettingUpdatedEvent<SettingType> extends CustomEvent<
  SettingUpdatedEventPayload<SettingType>
> {
  constructor(payload: SettingUpdatedEventPayload<SettingType>) {
    super(settingUpdatedEventName, {
      bubbles: true,
      composed: true,
      detail: payload,
    });
  }
}

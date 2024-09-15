import { MobxLitElement } from '@adobe/lit-mobx';
import { css, html } from 'lit';
import { customElement } from 'lit/decorators.js';

import { appState } from '@/state';

import '@/components/ss-select';

import { theme } from '@/styles/theme';
import { SelectChangedEvent } from '@/lib/Event';
import { ListConfigChangedEvent } from '@/events/list-config-changed';

@customElement('list-config')
export class ListConfig extends MobxLitElement {
  static styles = [
    theme,
    css`
      .box {
        padding: 1rem;
      }
    `,
  ];

  private state = appState;

  _handleConfigChanged(e: SelectChangedEvent) {
    console.log(e.detail.value);
    this.state.setListConfigId(e.detail.value);
    this.dispatchEvent(
      new ListConfigChangedEvent({ listConfigId: e.detail.value }),
    );
  }

  render() {
    return html`
      <div class="box">
        <ss-select
          selected=${this.state.listConfigId}
          @select-changed=${(e: SelectChangedEvent) => {
            this._handleConfigChanged(e);
          }}
          .options=${Object.values(this.state.listConfigs).map(config => ({
            value: config.id,
            label: config.name,
          }))}
        >
        </ss-select>
      </div>
    `;
  }
}

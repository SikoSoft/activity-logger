import { translate } from '@/lib/Localization';
import { css, html } from 'lit';
import { customElement, state } from 'lit/decorators.js';

import '@ss/ui/components/ss-collapsable';

import { theme } from '@/styles/theme';
import { ToggleChangedEvent } from '@ss/ui/components/ss-toggle.events';
import { MobxLitElement } from '@adobe/lit-mobx';
import { appState } from '@/state';

@customElement('data-manager')
export class DataManager extends MobxLitElement {
  private state = appState;

  static styles = [
    theme,
    css`
      .data-manager {
        padding: 1rem;
        margin-bottom: 1rem;

        .import {
          textarea {
            width: 100%;
            height: 200px;
            font-family: monospace;
            font-size: 0.9rem;
            box-sizing: border-box;
          }
        }
      }
    `,
  ];

  @state()
  open: boolean = this.state.collapsablePanelState['data-manager'] ?? true;

  toggle(e: ToggleChangedEvent) {
    console.log('TOGGLE', e.detail);
  }

  render() {
    return html`
      <ss-collapsable
        title=${translate('dataManager')}
        ?open=${this.open}
        panelId=${`data-manager`}
        @collapsable-toggled=${this.toggle}
      >
        <div class="import">
          <textarea></textarea>

          <div class="buttons">
            <ss-button>${translate('importData')}</ss-button>
          </div>
        </div>
      </ss-collapsable>
    `;
  }
}

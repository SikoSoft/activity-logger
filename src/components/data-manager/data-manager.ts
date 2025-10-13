import { translate } from '@/lib/Localization';
import { css, html, TemplateResult } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { MobxLitElement } from '@adobe/lit-mobx';

import { appState } from '@/state';

import '@ss/ui/components/ss-collapsable';
import '@ss/ui/components/tab-container';
import '@ss/ui/components/tab-pane';
import '@/components/data-manager/export-tool/export-tool';
import '@/components/data-manager/import-tool/import-tool';

import { theme } from '@/styles/theme';

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

  connectedCallback(): void {
    super.connectedCallback();
  }

  render(): TemplateResult {
    return html`
      <ss-collapsable
        title=${translate('dataManager')}
        ?open=${this.open}
        panelId=${`data-manager`}
      >
        <tab-container
          paneId="data-manager"
          index=${this.state.tabState['data-manager'] ?? 0}
        >
          <tab-pane title=${translate('exportData')}>
            <export-tool></export-tool>
          </tab-pane>
          <tab-pane title=${translate('importData')}>
            <import-tool></import-tool>
          </tab-pane>
        </tab-container>
      </ss-collapsable>
    `;
  }
}

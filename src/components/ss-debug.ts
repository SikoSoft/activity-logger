import { MobxLitElement } from '@adobe/lit-mobx';
import { html, nothing } from 'lit';
import { customElement } from 'lit/decorators.js';

import { appState } from '@/state';

@customElement('ss-debug')
export class SSDebug extends MobxLitElement {
  private state = appState;

  render() {
    return html`
      ${this.state.debugMode
        ? html`
            <div class="debug">
              <slot></slot>
            </div>
          `
        : nothing}
    `;
  }
}

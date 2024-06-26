import { css, html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { repeat } from 'lit/directives/repeat.js';
import { MobxLitElement } from '@adobe/lit-mobx';

import { appState } from '@/state';

import '@/components/action-toast';

import { theme } from '@/styles/theme';

@customElement('action-toasts')
export class ActionToasts extends MobxLitElement {
  private state = appState;

  static styles = [
    theme,
    css`
      .toasts {
        position: fixed;
        bottom: 0;
        width: 80%;
        left: 10%;
      }
    `,
  ];

  render() {
    return html`
      <div class="toasts">
        ${repeat(
          this.state.toasts,
          toast => toast.id,
          toast => html`
            <action-toast
              toastId=${toast.id}
              message=${toast.message}
              startTime=${toast.startTime.getTime()}
            ></action-toast>
          `,
        )}
      </div>
    `;
  }
}

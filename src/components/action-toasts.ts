import { LitElement, css, html } from 'lit';
import { property, customElement, state } from 'lit/decorators.js';

import { theme } from '../styles/theme';
import { appState } from '../state';
import { repeat } from 'lit/directives/repeat.js';

import './action-toast';
import { MobxLitElement } from '@adobe/lit-mobx';

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
          `
        )}
      </div>
    `;
  }
}

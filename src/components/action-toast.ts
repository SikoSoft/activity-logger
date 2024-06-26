import { LitElement, html, css } from 'lit';
import { property, customElement, state } from 'lit/decorators.js';

import { theme } from '@/styles/theme';

@customElement('action-toast')
export class ActionToast extends LitElement {
  static styles = [
    theme,
    css`
      .toast {
        padding: 1rem;
        text-align: center;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
      }
    `,
  ];

  @property() message: string = '';
  @property({ type: Number }) startTime: number = 0;

  @state() get startDate() {
    return new Date(this.startTime);
  }

  render() {
    return html` <div class="box toast">${this.message}</div> `;
  }
}

import { LitElement, html, css } from 'lit';
import { property, customElement, state } from 'lit/decorators.js';

import { theme } from '@/styles/theme';
import {
  ActionToastProp,
  actionToastPropConfig,
  ActionToastProps,
} from './action-toast.models';

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

  @property()
  [ActionToastProp.MESSAGE]: ActionToastProps[ActionToastProp.MESSAGE] =
    actionToastPropConfig[ActionToastProp.MESSAGE].default;

  render() {
    return html` <div class="box toast">${this.message}</div> `;
  }
}

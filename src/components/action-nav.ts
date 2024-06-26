import { LitElement, html, css } from 'lit';
import { property, customElement } from 'lit/decorators.js';

import { ActionView } from '@/models/Action';
import { translate } from '@/util/strings';

import { theme } from '@/styles/theme';

const views: { id: ActionView; label: string }[] = [
  {
    id: ActionView.INPUT,
    label: translate('new'),
  },
  { id: ActionView.LIST, label: translate('list') },
];

@customElement('action-nav')
export class ActionNav extends LitElement {
  static styles = [
    theme,
    css`
      .box {
        overflow: hidden;
      }

      nav span {
        display: inline-block;
        height: 32px;
        line-height: 32px;
        width: 50%;
        text-align: center;
        background-color: #ececec;
        cursor: pointer;
      }

      nav span.active {
        background-color: #fff;
      }
    `,
  ];

  @property() active: ActionView = ActionView.INPUT;

  _setActiveView(view: ActionView) {
    this.dispatchEvent(
      new CustomEvent('view-changed', {
        bubbles: true,
        composed: true,
        detail: view,
      }),
    );
  }

  render() {
    return html`
      <nav class="box">
        ${views.map(
          view =>
            html`<span
              @click="${() => {
                this._setActiveView(view.id);
              }}"
              class=${this.active === view.id ? 'active' : ''}
              >${view.label}</span
            >`,
        )}
      </nav>
    `;
  }
}

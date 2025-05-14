import { LitElement, html, css } from 'lit';
import { property, customElement } from 'lit/decorators.js';
import { msg } from '@lit/localize';

import { ActionView } from '@/models/Action';

import { theme } from '@/styles/theme';
import {
  ActionNavProp,
  actionNavProps,
  ActionNavProps,
} from './action-nav.models';

const views: { id: ActionView; label: string }[] = [
  {
    id: ActionView.INPUT,
    label: msg('New'),
  },
  { id: ActionView.LIST, label: msg('List') },
  { id: ActionView.MOCK, label: msg('Mock') },
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
        width: calc(100% / var(--num-views));
        text-align: center;
        background-color: #ececec;
        cursor: pointer;
      }

      nav span.active {
        background-color: #fff;
      }
    `,
  ];

  @property()
  [ActionNavProp.ACTIVE]: ActionNavProps[ActionNavProp.ACTIVE] =
    actionNavProps[ActionNavProp.ACTIVE].default;

  setActiveView(view: ActionView) {
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
      <nav class="box" style="--num-views: ${views.length}">
        ${views.map(
          view =>
            html`<span
              @click="${() => {
                this.setActiveView(view.id);
              }}"
              class=${this.active === view.id ? 'active' : ''}
              >${view.label}</span
            >`,
        )}
      </nav>
    `;
  }
}

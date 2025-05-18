import { LitElement, html, css, PropertyValues } from 'lit';
import { property, customElement, state } from 'lit/decorators.js';
import { msg } from '@lit/localize';

import { ActionView } from '@/models/Action';

import { theme } from '@/styles/theme';
import {
  ActionNavProp,
  actionNavProps,
  ActionNavProps,
} from './action-nav.models';
import { MobxLitElement } from '@adobe/lit-mobx';
import { appState } from '@/state';

export interface ActionViewConfig {
  id: ActionView;
  label: string;
}

const views: ActionViewConfig[] = [
  {
    id: ActionView.INPUT,
    label: msg('New'),
  },
  { id: ActionView.LIST, label: msg('List') },
];

const debugViews = [...views, { id: ActionView.MOCK, label: msg('Mock') }];

@customElement('action-nav')
export class ActionNav extends MobxLitElement {
  private state = appState;

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

  @state()
  get displayViews(): ActionViewConfig[] {
    return this.state.debugMode ? debugViews : views;
  }

  protected updated(_changedProperties: PropertyValues): void {
    super.updated(_changedProperties);
    if (_changedProperties.has(ActionNavProp.ACTIVE)) {
      //this.setActiveView(this[ActionNavProp.ACTIVE]);
    }

    console.log('updated', _changedProperties);
  }

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
      <nav
        class="box"
        style="--num-views: ${this.displayViews.length}"
        data-debug=${this.state.debugMode}
      >
        ${this.displayViews.map(
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

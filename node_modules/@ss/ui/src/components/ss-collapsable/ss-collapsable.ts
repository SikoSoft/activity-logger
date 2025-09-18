import { LitElement, html, css, PropertyValues } from 'lit';
import { property, customElement, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';

import { theme } from '../../styles/theme';
import {
  SSCollapsableProp,
  ssCollapsableProps,
  SSCollapsableProps,
} from './ss-collapsable.models';
import { CollapsableToggledEvent } from './ss-collapsable.events';

@customElement('ss-collapsable')
export class SSCollapsable extends LitElement {
  static styles = [
    theme,
    css`
      .collapsable {
        padding: 1rem;
      }

      .head {
        display: flex;
      }

      .title {
        flex-grow: 9;
      }

      .icon {
        flex-grow: 1;
        text-align: right;
      }

      .icon button {
        width: auto;
        padding: 0 0.5rem;
      }

      .body {
        display: none;
        transition: all 0.3s;
        overflow: hidden;
      }

      .collapsable.open .body {
        display: block;
        padding-top: 1rem;
      }
    `,
  ];

  @property()
  [SSCollapsableProp.TITLE]: SSCollapsableProps[SSCollapsableProp.TITLE] =
    ssCollapsableProps[SSCollapsableProp.TITLE].default;

  @property({ type: Boolean, reflect: true })
  [SSCollapsableProp.OPEN]: SSCollapsableProps[SSCollapsableProp.OPEN] =
    ssCollapsableProps[SSCollapsableProp.OPEN].default;

  @property({ type: String, reflect: true })
  [SSCollapsableProp.PANEL_ID]: SSCollapsableProps[SSCollapsableProp.PANEL_ID] =
    ssCollapsableProps[SSCollapsableProp.PANEL_ID].default;

  protected firstUpdated(changedProperties: PropertyValues): void {
    super.firstUpdated(changedProperties);

    if (this.panelId === '') {
      this.panelId = this.title;
    }
  }

  @state()
  get classes() {
    return { box: true, collapsable: true, open: this.open };
  }

  private handleIconClick() {
    this.toggle();
  }

  private toggle() {
    this.open = !this.open;

    /**
     * @todo remove this event once fully transitioned to CollapsableToggledEvent
     */
    this.dispatchEvent(
      new CustomEvent('toggled', {
        bubbles: true,
        composed: true,
        detail: this.open,
      }),
    );

    this.dispatchEvent(
      new CollapsableToggledEvent({ panelId: this.panelId, isOpen: this.open }),
    );
  }

  render() {
    return html`
      <div class=${classMap(this.classes)}>
        <div class="head">
          <div class="title">${this.title}</div>
          <div class="icon">
            <button @click=${() => this.handleIconClick()}>
              ${this.open ? '-' : '+'}
            </button>
          </div>
        </div>
        <div class="body">
          <slot></slot>
        </div>
      </div>
    `;
  }
}

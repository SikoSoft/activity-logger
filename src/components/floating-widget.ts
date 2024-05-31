import { LitElement, css } from 'lit';
import { html, unsafeStatic } from 'lit/static-html.js';
import { property, customElement, state } from 'lit/decorators.js';
import { theme } from '../styles/theme';
import { classMap } from 'lit/directives/class-map.js';
import {
  ToggleChangedEvent,
  toggleChangedEventName,
} from '../events/toggle-changed';

import '@/components/ss-toggle';
import { MobxLitElement } from '@adobe/lit-mobx';
import { appState } from '@/state';
import { storage } from '@/lib/Storage';
import { translate } from '@/util/strings';

// square rotated 45 degrees is 1.42 as wide
@customElement('floating-widget')
export class FloatingWidget extends MobxLitElement {
  public state = appState;
  static styles = [
    theme,
    css`
      :host {
        --background-color: #ccc;
        --border-color: #999;
        --head-height: 2rem;
      }

      .widget {
        position: fixed;
        bottom: -5rem;
        left: 5%;
        width: 90%;
        opacity: 0.6;
        transition: all 0.2s;

        &:hover {
          opacity: 0.9;
          bottom: -4rem;
        }

        &.open {
          opacity: 1;
          bottom: 0;

          .head {
            cursor: s-resize;
          }
        }
      }

      .head {
        z-index: 2;
        position: relative;
        width: 90%;
        height: var(--head-height);
        background-color: var(--background-color);
        margin: auto;
        border-top: 1px var(--border-color) solid;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
        cursor: n-resize;

        &::before,
        &::after {
          //display: none;
          z-index: 0;
          position: absolute;
          top: 0.4rem;
          //display: inline-block;
          content: '';
          width: calc(var(--head-height) / 1.42 * 2);
          height: calc(var(--head-height) / 1.42 * 2);
          background-color: #ff0; //var(--background-color);
          transform: rotate(45deg);
          border-radius: 8px;
        }

        &::before {
          left: -1.5rem;
          border-left: 1px var(--border-color) solid;
        }

        &::after {
          right: -1.5rem;
          border-top: 1px var(--border-color) solid;
        }

        .handle {
          position: absolute;
          left: 10%;
          top: 50%;
          width: 80%;
          border-radius: 0.25rem;
          height: 0.25rem;
          background-color: #666;
          transform: translateY(-50%);
          border: 1px #444 solid;
        }
      }

      .body {
        transition: all 0.3s;
        position: relative;
        z-index: 3;
        background-color: var(--background-color);
        width: 100%;
        margin: auto;
        border-left: 1px var(--border-color) solid;
        border-right: 1px var(--border-color) solid;
        box-sizing: border-box;
        margin-top: -2px;

        .option {
          display: flex;
          padding: 1rem;
          flex-direction: row;
          justify-content: space-between;

          h4 {
            margin: 0;
            line-height: 3rem;
            height: 3rem;
          }
        }
      }
    `,
  ];

  @state() open: boolean = false;

  @state()
  get classes() {
    return {
      widget: true,
      open: this.open,
    };
  }

  private _handleToggleChanged(event: ToggleChangedEvent) {
    this.state.setAdvancedMode(event.detail.on);
    storage.saveAdvancedMode(event.detail.on);
  }

  private _handleToggleOpen() {
    this.open = !this.open;
  }

  private _handleOpen() {
    this.open = true;
  }

  render() {
    return html`
      <div class=${classMap(this.classes)}>
        <div class="head" @click=${this._handleToggleOpen}>
          <div class="handle"></div>
        </div>
        <div class="body" @mouseenter=${this._handleOpen}>
          <div class="option">
            <h4>${translate('advancedMode')}</h4>
            <ss-toggle
              @${unsafeStatic(toggleChangedEventName)}=${this
                ._handleToggleChanged}
              ?on=${this.state.advancedMode}
            ></ss-toggle>
          </div>
        </div>
      </div>
    `;
  }
}

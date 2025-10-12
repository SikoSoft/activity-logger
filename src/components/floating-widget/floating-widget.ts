import { css, TemplateResult } from 'lit';
import { html } from 'lit/static-html.js';
import { customElement, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { MobxLitElement } from '@adobe/lit-mobx';

import { translate } from '@/lib/Localization';
import { appState } from '@/state';
import { storage } from '@/lib/Storage';

import { ToggleChangedEvent } from '@ss/ui/components/ss-toggle.events';

import '@ss/ui/components/ss-toggle';
import '@/components/user-pane/user-pane';

import { theme } from '@/styles/theme';

@customElement('floating-widget')
export class FloatingWidget extends MobxLitElement {
  public state = appState;
  private timeout: number | undefined;
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
        z-index: 1000;
        bottom: 0;
        left: 5%;
        width: 90%;
        opacity: 0.6;
        transition: all 0.2s;
        transform: translateY(88%);

        @media (hover: hover) {
          &:hover {
            opacity: 0.9;
            transform: translateY(86%);
            //bottom: -4rem;

            .head {
              .handle {
                transform: translateY(-50%) scale(1.125);
                box-shadow: 0 0 5px #000;
              }
            }
          }
        }

        &.open {
          opacity: 1;
          bottom: 0;
          transform: translateY(0%);

          .head {
            cursor: s-resize;
          }
        }
      }

      .head {
        z-index: 2;
        position: relative;
        height: var(--head-height);
        margin: auto;
        cursor: n-resize;
        display: flex;

        .left,
        .right {
          width: var(--head-height);
          height: var(--head-height);
          position: relative;
          overflow: hidden;

          &::before {
            z-index: 0;
            position: absolute;
            top: 0.4rem;
            content: '';
            width: calc(var(--head-height) / 1.42 * 2);
            height: calc(var(--head-height) / 1.42 * 2);
            background-color: var(--background-color);
            transform: rotate(45deg);
            border-radius: 0px;
          }

          &.left::before {
            left: 10px;
            border-left: 1px var(--border-color) solid;
          }

          &.right::before {
            right: 10px;
            border-top: 1px var(--border-color) solid;
          }
        }

        .center {
          border-top: 1px var(--border-color) solid;
          position: relative;
          background-color: var(--background-color);
          flex-grow: 10;
          height: var(--head-height);
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
          transition: all 0.2s;
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

        .user {
          padding: 1rem;
        }

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
  @state() mouseIn: boolean = false;

  @state()
  get classes(): Record<string, boolean> {
    return {
      widget: true,
      open: this.open,
    };
  }

  private handleToggleAdvancedChanged(event: ToggleChangedEvent): void {
    this.state.setAdvancedMode(event.detail.on);
    storage.saveAdvancedMode(event.detail.on);
  }

  private handleToggleDebugChanged(event: ToggleChangedEvent): void {
    this.state.setDebugMode(event.detail.on);
    storage.saveDebugMode(event.detail.on);
  }

  private handleToggleOpen(): void {
    this.open = !this.open;
  }

  private handleOpen(): void {
    this.open = true;
  }

  private handleMouseEnter(): void {
    this.mouseIn = true;
    if (this.timeout) {
      clearTimeout(this.timeout);
    }
  }

  private handleMouseLeave(): void {
    this.mouseIn = false;
    this.timeout = setTimeout(() => {
      this.open = false;
    }, 500);
  }

  render(): TemplateResult {
    return html`
      <div
        class=${classMap(this.classes)}
        @mouseenter=${this.handleMouseEnter}
        @mouseleave=${this.handleMouseLeave}
      >
        <div class="head" @click=${this.handleToggleOpen}>
          <div class="left"></div>

          <div class="center">
            <div class="handle"></div>
          </div>

          <div class="right"></div>
        </div>

        <div class="body" @mouseenter=${this.handleOpen}>
          <div class="user">
            <user-pane></user-pane>
          </div>

          <div class="option">
            <h4>${translate('advancedMode')}</h4>
            <ss-toggle
              @toggle-changed=${this.handleToggleAdvancedChanged}
              ?on=${this.state.advancedMode}
            ></ss-toggle>
          </div>

          <div class="option">
            <h4>${translate('debugMode')}</h4>
            <ss-toggle
              @toggle-changed=${this.handleToggleDebugChanged}
              ?on=${this.state.debugMode}
            ></ss-toggle>
          </div>
        </div>
      </div>
    `;
  }
}

import { LitElement, html, css } from 'lit';
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

@customElement('floating-widget')
export class FloatingWidget extends MobxLitElement {
  public state = appState;
  static styles = [
    theme,
    css`
      .widget {
        position: fixed;
        bottom: 0;
        left: 0;
      }
    `,
  ];

  @state() isOpen: boolean = false;

  @state()
  get classes() {
    return {
      box: true,
      widget: true,
      open: this.isOpen,
    };
  }

  private _handleToggleChanged(event: ToggleChangedEvent) {
    this.state.setAdvancedMode(event.detail.on);
    storage.saveAdvancedMode(event.detail.on);
  }

  render() {
    return html`
      <div class=${classMap(this.classes)}>
        <div class="icon"></div>
        <ss-toggle
          @toggle-changed=${this._handleToggleChanged}
          ?on=${this.state.advancedMode}
        ></ss-toggle>
      </div>
    `;
  }
}

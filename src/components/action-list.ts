import { LitElement, html, css } from 'lit';
import { property, customElement, state } from 'lit/decorators.js';
import { repeat } from 'lit/directives/repeat.js';
import { ActionItem } from '../models/Action';

import './action-list-item';
import { config } from '../models/Config';
import { theme } from '../styles/theme';

@customElement('action-list')
export class ActionList extends LitElement {
  static styles = [theme];
  @state() items: ActionItem[] = [];

  async connectedCallback(): Promise<void> {
    super.connectedCallback();
    let json: { actions: ActionItem[] };
    try {
      const response = await fetch(config.apiUrl);
      json = await response.json();
      if (json.actions) {
        this.items = json.actions;
      }
    } catch (error) {
      console.error(`Failed to get list: ${JSON.stringify(error)}`);
    }

    this.addEventListener('action-item-deleted', e => {
      const event = e as CustomEvent;
      this.items = this.items.filter(item => item.id !== event.detail);
    });

    this.addEventListener('action-item-updated', e => {
      const event = e as CustomEvent;
      this.items = this.items.map(item =>
        item.id === event.detail.id
          ? { ...item, desc: event.detail.desc }
          : item
      );
    });
  }

  render() {
    return html`
      <div class="box">
        ${repeat(
          this.items,
          item => item.id,
          item =>
            html`
              <action-list-item
                actionId=${item.id}
                type=${item.type}
                desc=${item.desc}
                time=${item.time}
              ></action-list-item>
            `
        )}
      </div>
    `;
  }
}

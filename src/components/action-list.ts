import { LitElement, html } from 'lit';
import { customElement, query, state } from 'lit/decorators.js';
import { repeat } from 'lit/directives/repeat.js';
import { ActionItem } from '../models/Action';

import './action-list-item';
import { config } from '../models/Config';
import { theme } from '../styles/theme';

const apiUrl = `${config.apiUrl}action`;

@customElement('action-list')
export class ActionList extends LitElement {
  static styles = [theme];
  @query('#lazy-loader') lazyLoader!: HTMLDivElement;
  @state() items: ActionItem[] = [];
  @state() start: number = 0;
  @state() reachedEnd: boolean = false;
  @state() loading: boolean = false;

  get totalShown(): number {
    return this.start + config.perPage;
  }

  get lazyLoaderIsVisible(): boolean {
    var rect = this.lazyLoader.getBoundingClientRect();
    return (
      rect.bottom <=
      (window.innerHeight || document.documentElement.clientHeight)
    );
  }

  async connectedCallback(): Promise<void> {
    super.connectedCallback();
    this._load();

    window.addEventListener('scroll', () => {
      if (this.lazyLoaderIsVisible && !this.loading && !this.reachedEnd) {
        this._load(true);
      }
    });

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

  private async _load(more: boolean = false): Promise<void> {
    this.loading = true;
    if (more) {
      this.start += config.perPage;
    }
    const url = this.start > 0 ? `${apiUrl}?start=${this.start}` : apiUrl;
    let json: { actions: ActionItem[]; total: number };
    try {
      const response = await fetch(url);
      json = await response.json();
      if (json.actions) {
        this.items = [...this.items, ...json.actions];
      }
      if (json.total) {
        this.reachedEnd = json.total <= this.totalShown ? true : false;
      }
    } catch (error) {
      console.error(`Failed to get list: ${JSON.stringify(error)}`);
    } finally {
      this.loading = false;
    }
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
                occurredAt=${item.occurredAt}
              ></action-list-item>
            `
        )}
        <div id="lazy-loader"></div>
      </div>
    `;
  }
}

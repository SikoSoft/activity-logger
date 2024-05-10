import { LitElement, html } from 'lit';
import { customElement, query, state } from 'lit/decorators.js';
import { repeat } from 'lit/directives/repeat.js';
import { ActionItem } from '../models/Action';

import './action-list-item';
import { config } from '../models/Config';
import { theme } from '../styles/theme';
import { api } from '../lib/Api';

const apiUrl = 'action';

@customElement('action-list')
export class ActionList extends LitElement {
  static styles = [theme];
  private scrollHandler: EventListener = () => this._handleScroll();
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
    const docHeight =
      window.innerHeight || document.documentElement.clientHeight;
    return rect.bottom <= docHeight;
  }

  connectedCallback(): void {
    super.connectedCallback();
    this._load();

    window.addEventListener('scroll', this.scrollHandler);

    this.addEventListener('action-item-deleted', e => {
      const event = e as CustomEvent;
      this.items = this.items.filter(item => item.id !== event.detail);
    });

    this.addEventListener('action-item-updated', e => {
      const event = e as CustomEvent;
      this.items = this.items.map(item =>
        item.id === event.detail.id
          ? {
              ...item,
              desc: event.detail.desc,
              occurredAt: event.detail.occurredAt,
            }
          : item
      );
    });
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    window.removeEventListener('scroll', this.scrollHandler);
  }

  private _handleScroll() {
    if (this.lazyLoaderIsVisible && !this.loading && !this.reachedEnd) {
      this._load(true);
    }
  }

  private async _load(more: boolean = false): Promise<void> {
    this.loading = true;
    if (more) {
      this.start += config.perPage;
    }
    const url = this.start > 0 ? `${apiUrl}?start=${this.start}` : apiUrl;
    try {
      const json = await api.get<{ actions: ActionItem[]; total: number }>(url);
      if (json) {
        if (json.actions) {
          this.items = [...this.items, ...json.actions];
        }
        if (json.total) {
          this.reachedEnd = json.total <= this.totalShown ? true : false;
        }
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

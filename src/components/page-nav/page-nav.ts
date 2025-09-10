import { html, css, nothing } from 'lit';
import { property, customElement } from 'lit/decorators.js';
import { msg } from '@lit/localize';
import { MobxLitElement } from '@adobe/lit-mobx';

import { PageView } from '@/models/Page';
import { appState } from '@/state';
import { Version } from '@/models/Version';
import { storage } from '@/lib/Storage';
import { PageNavProp, pageNavProps, PageNavProps } from './page-nav.models';

import { theme } from '@/styles/theme';

export interface PageViewConfig {
  id: PageView;
  label: string;
}

const views: PageViewConfig[] = [
  {
    id: PageView.INPUT,
    label: msg('New'),
  },
  { id: PageView.LIST, label: msg('List') },
];

const debugViews: PageViewConfig[] = [
  ...views,
  { id: PageView.ADMIN, label: msg('Admin') },
];

@customElement('page-nav')
export class PageNav extends MobxLitElement {
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
  [PageNavProp.ACTIVE]: PageNavProps[PageNavProp.ACTIVE] =
    pageNavProps[PageNavProp.ACTIVE].default;

  get displayViews(): PageViewConfig[] {
    return import.meta.env.APP_FF_PROPERTIES && this.state.debugMode
      ? debugViews
      : views;
  }

  setActiveView(view: PageView) {
    this.dispatchEvent(
      new CustomEvent('view-changed', {
        bubbles: true,
        composed: true,
        detail: view,
      }),
    );
  }

  setVersion(e: CustomEvent) {
    const version = e.detail.value as Version;
    this.state.setVersion(version);
    storage.saveVersion(version);
    console.log('set version', version);
  }

  render() {
    return html`
      ${this.state.debugMode
        ? html` <ss-select
            @select-changed=${(e: CustomEvent) => this.setVersion(e)}
            selected=${this.state.version}
            .options=${[
              { value: Version.V1, label: msg('v1 (classic)') },
              { value: Version.V2, label: msg('v2 (experimental)') },
            ]}
          >
          </ss-select>`
        : nothing}
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

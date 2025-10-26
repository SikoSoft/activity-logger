import { html, css, nothing, TemplateResult } from 'lit';
import { property, customElement, state } from 'lit/decorators.js';
import { MobxLitElement } from '@adobe/lit-mobx';

import { translate } from '@/lib/Localization';
import { PageView } from '@/models/Page';
import { appState } from '@/state';
import { Version } from '@/models/Version';
import { storage } from '@/lib/Storage';
import { PageNavProp, pageNavProps, PageNavProps } from './page-nav.models';

import { theme } from '@/styles/theme';
import { TabIndexChangedEvent } from '@ss/ui/components/tab-container.events';
import { repeat } from 'lit/directives/repeat.js';

export interface PageViewConfig {
  id: PageView;
  label: string;
}

const views: PageViewConfig[] = [
  {
    id: PageView.INPUT,
    label: translate('new'),
  },
  { id: PageView.LIST, label: translate('list') },
];

const debugViews: PageViewConfig[] = [
  ...views,
  { id: PageView.ADMIN, label: translate('admin') },
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

      tab-container::party(headers) {
        display: flex;
      }

      tab-container::part(header) {
        text-align: center;
        flex: 1;
      }

      tab-container::part(content) {
        display: none;
      }
    `,
  ];

  @property()
  [PageNavProp.ACTIVE]: PageNavProps[PageNavProp.ACTIVE] =
    pageNavProps[PageNavProp.ACTIVE].default;

  @state()
  get displayViews(): PageViewConfig[] {
    console.log('Debug mode:', this.state.debugMode);
    return this.state.debugMode ? debugViews : views;
  }

  setActiveView(view: PageView): void {
    this.dispatchEvent(
      new CustomEvent('view-changed', {
        bubbles: true,
        composed: true,
        detail: view,
      }),
    );
  }

  setVersion(e: CustomEvent): void {
    const version = e.detail.value as Version;
    this.state.setVersion(version);
    storage.saveVersion(version);
  }

  handleTabChanged(e: TabIndexChangedEvent): void {
    const index = e.detail.index;
    const view = this.displayViews[index];
    if (view) {
      this.setActiveView(view.id);
    }
  }

  render(): TemplateResult {
    return html`
      ${this.state.debugMode
        ? html` <ss-select
            @select-changed=${this.setVersion}
            selected=${this.state.version}
            .options=${[
              { value: Version.V1, label: translate('v1Classic') },
              { value: Version.V2, label: translate('v2Experimental') },
            ]}
          >
          </ss-select>`
        : nothing}
      <nav
        class="box"
        style="--num-views: ${this.displayViews.length}"
        data-debug=${this.state.debugMode ? 'true' : 'false'}
        data-view-count=${this.displayViews.length}
      >
        <tab-container
          paneId="page-nav"
          @tab-index-changed=${this.handleTabChanged}
          index=${this.displayViews.findIndex(
            v => v.id === this[PageNavProp.ACTIVE],
          )}
        >
          ${repeat(
            this.displayViews,
            view => view.id,
            view => html`<tab-pane title=${view.label}></tab-pane>`,
          )}
        </tab-container>
      </nav>
    `;
  }
}

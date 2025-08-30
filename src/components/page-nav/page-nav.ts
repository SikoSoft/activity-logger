import { html, css, PropertyValues } from 'lit';
import { property, customElement, state } from 'lit/decorators.js';
import { msg } from '@lit/localize';

import { PageView } from '@/models/Page';

import { theme } from '@/styles/theme';
import { PageNavProp, pageNavProps, PageNavProps } from './page-nav.models';
import { MobxLitElement } from '@adobe/lit-mobx';
import { appState } from '@/state';
import { Version } from '@/models/Version';
import { storage } from '@/lib/Storage';

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

  protected updated(_changedProperties: PropertyValues): void {
    super.updated(_changedProperties);
    if (_changedProperties.has(PageNavProp.ACTIVE)) {
      //this.setActiveView(this[PageNavProp.ACTIVE]);
    }

    console.log('updated', _changedProperties);
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
      <ss-select
        @select-changed=${(e: CustomEvent) => this.setVersion(e)}
        selected=${this.state.version}
        .options=${[
          { value: Version.V1, label: msg('v1 (classic)') },
          { value: Version.V2, label: msg('v2 (experimental)') },
        ]}
      >
      </ss-select>
      <nav
        class="box"
        style="--num-views: ${views.length}"
        data-debug=${this.state.debugMode}
      >
        ${views.map(
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

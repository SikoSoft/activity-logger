import { css, html, LitElement } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { TabPane } from './tab-pane/tab-pane';
import { repeat } from 'lit/directives/repeat.js';
import { classMap } from 'lit/directives/class-map.js';
import { TabIndexChangedEvent } from './tab-container.events';
import {
  Tab,
  TabContainerProp,
  tabContainerProps,
  TabContainerProps,
} from './tab-container.models';

@customElement('tab-container')
export class TabContainer extends LitElement {
  static styles = css`
    .tab-headers {
      display: flex;
      border-bottom: 1px solid var(--border-color, #ccc);
      background-color: var(--header-bg-color, #f9f9f9);

      .tab-header {
        padding: 12px 16px;
        cursor: pointer;
        border: 1px solid transparent;
        border-bottom: none;
        margin-bottom: -1px;

        &:hover {
          background-color: var(--header-hover-bg-color, #eee);
        }

        &.active {
          border: 1px solid var(--border-color, #ccc);
          border-bottom: none;
          background-color: var(--active-header-bg-color, #fff);
          font-weight: bold;
        }
      }
    }

    .tab-content {
      .tab-pane {
        display: none;
        padding: 16px;

        &.active {
          display: block;
        }

        &.hidden {
          display: none;
        }
      }
    }
  `;

  @property({ reflect: true, type: Number })
  [TabContainerProp.INDEX]: TabContainerProps[TabContainerProp.INDEX] =
    tabContainerProps[TabContainerProp.INDEX].default;

  @property()
  [TabContainerProp.PANE_ID]: TabContainerProps[TabContainerProp.PANE_ID] =
    tabContainerProps[TabContainerProp.PANE_ID].default;

  @state()
  tabs: Tab[] = [];

  connectedCallback(): void {
    super.connectedCallback();

    this.setupPanes();
  }

  setupPanes() {
    const panes = this.querySelectorAll('tab-pane');
    panes.forEach((pane, index) => {
      const tabPane = pane as TabPane;
      this.tabs.push({
        title: pane.getAttribute('title') || `Tab ${index + 1}`,
        content: tabPane,
      });
    });
  }

  setActiveIndex(index: number) {
    this.index = index;

    this.dispatchEvent(
      new TabIndexChangedEvent({ index, paneId: this.paneId }),
    );
  }

  render() {
    return html`
      <div class="tab-container" part="container">
        <div class="tab-headers" part="headers">
          ${repeat(
            this.tabs,
            (tab, index) => html`
              <div
                part="header"
                class=${classMap({
                  'tab-header': true,
                  active: this.index === index,
                })}
                @click=${() => {
                  this.setActiveIndex(index);
                }}
              >
                ${tab.title}
              </div>
            `,
          )}
        </div>

        <div class="tab-content" part="content">
          ${repeat(
            this.tabs,
            (tab, index) => html`
              <div
                part="pane"
                class=${classMap({
                  'tab-pane': true,
                  active: this.index === index,
                })}
              >
                ${tab.content}
              </div>
            `,
          )}
        </div>
      </div>
    `;
  }
}

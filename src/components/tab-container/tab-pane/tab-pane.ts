import { html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { TabPaneProp, TabPaneProps, tabPaneProps } from './tab-pane.models';

@customElement('tab-pane')
export class TabPane extends LitElement {
  @property()
  [TabPaneProp.TITLE]: TabPaneProps[TabPaneProp.TITLE] =
    tabPaneProps[TabPaneProp.TITLE].default;

  render() {
    return html`
      <div class="tab-pane">
        <slot></slot>
      </div>
    `;
  }
}

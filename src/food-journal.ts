import { LitElement, html, css } from 'lit';
import { property, customElement, state } from 'lit/decorators.js';

import './components/action-nav';
import './components/action-form';
import './components/action-list';
import { ActionView } from './models/Action';
import { theme } from './styles/theme';

export interface ViewChangedEvent extends Event {
  detail: ActionView;
}

@customElement('food-journal')
export class FoodJournal extends LitElement {
  static styles = [theme];
  @property({ type: String }) header = 'My app';
  @state() view: ActionView = ActionView.INPUT;

  connectedCallback(): void {
    super.connectedCallback();
    this.addEventListener('view-changed', (e: Event) => {
      const event = e as ViewChangedEvent;
      this.view = event.detail;
    });
  }

  _activeView() {
    switch (this.view) {
      case ActionView.INPUT:
        return html`<action-form></action-form>`;
    }
    return html`<action-list></action-list>`;
  }

  render() {
    return html`
      <action-nav active=${this.view}></action-nav>
      <main>${this._activeView()}</main>
    `;
  }
}

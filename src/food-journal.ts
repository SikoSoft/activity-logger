import { html } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { config } from './models/Config';

import './components/action-nav';
import './components/action-form';
import './components/action-list';
import './components/action-toasts';
import { ActionView } from './models/Action';
import { theme } from './styles/theme';

import { MobxLitElement } from '@adobe/lit-mobx';
import { appState } from './state';
import { api } from './lib/Api';
import { storage } from './lib/Storage';

export interface ViewChangedEvent extends Event {
  detail: ActionView;
}

@customElement('food-journal')
export class FoodJournal extends MobxLitElement {
  private state = appState;

  static styles = [theme];

  header = 'My app';
  @state() view: ActionView = ActionView.INPUT;

  connectedCallback(): void {
    super.connectedCallback();
    this.addEventListener('view-changed', (e: Event) => {
      const event = e as ViewChangedEvent;
      this.view = event.detail;
    });

    this._getSuggestions();

    storage.loadFilter();
  }

  private async _getSuggestions() {
    try {
      const json = await api.get<{ suggestions: string[] }>('actionSuggestion');
      if (json) {
        this.state.setAutoSuggestions(json.suggestions);
      }
    } catch (error) {
      console.error(`Failed to get suggestions: ${JSON.stringify(error)}`);
    }
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
      <action-toasts></action-toasts>
    `;
  }
}

import { html } from 'lit';
import { customElement, state } from 'lit/decorators.js';

import '@/components/action-nav';
import '@/components/action-form';
import '@/components/action-list';
import '@/components/action-toasts';
import '@/components/floating-widget';
import { ActionView, defaultActionView } from './models/Action';
import { theme } from './styles/theme';

import { MobxLitElement } from '@adobe/lit-mobx';
import { storage } from './lib/Storage';
import { appState } from './state';

export interface ViewChangedEvent extends CustomEvent {
  detail: ActionView;
}

@customElement('activity-logger')
export class ActivityLogger extends MobxLitElement {
  public state = appState;
  static styles = [theme];

  @state() view: ActionView = defaultActionView;

  connectedCallback(): void {
    super.connectedCallback();

    this.addEventListener('view-changed', (e: Event) => {
      this._handleViewChanged(e);
    });

    storage.loadActiveFilter();
    const view = storage.getSavedView();
    if (view) {
      this.view = view;
    }
    this.state.setAdvancedMode(storage.getAdvancedMode());
    this.state.setDebugMode(storage.getDebugMode());
  }

  private _handleViewChanged(e: Event) {
    const event = e as CustomEvent;
    this.view = event.detail;
    storage.saveView(this.view);
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
      <floating-widget></floating-widget>
    `;
  }
}

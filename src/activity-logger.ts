import { html } from 'lit';
import { customElement, query, state } from 'lit/decorators.js';
import { MobxLitElement } from '@adobe/lit-mobx';

import { ActionView, defaultActionView } from '@/models/Action';
import { storage } from '@/lib/Storage';
import { appState } from '@/state';
import { ViewElement } from '@/lib/ViewElement';

import { OperationPerformedEvent } from '@/events/operation-performed';

import '@/components/action-nav';
import '@/components/action-form';
import '@/components/action-list';
import '@/components/action-toasts';
import '@/components/floating-widget';
import '@/components/bulk-manager';
import '@/components/list-config';

import { theme } from './styles/theme';

export interface ViewChangedEvent extends CustomEvent {
  detail: ActionView;
}

@customElement('activity-logger')
export class ActivityLogger extends MobxLitElement {
  public state = appState;
  static styles = [theme];

  @state() view: ActionView = defaultActionView;
  @query('main > *') viewComponent!: ViewElement;

  connectedCallback(): void {
    super.connectedCallback();

    this.addEventListener('view-changed', (e: Event) => {
      this._handleViewChanged(e);
    });

    this._restoreState();
  }

  private async _restoreState() {
    const listConfigs = await storage.getListConfigs();
    console.log('restoreState listConfigs', listConfigs);
    this.state.setListConfigs(listConfigs);

    const listConfigId = storage.getActiveListConfigId();
    console.log('listConfigId in restoreState', listConfigId);
    this.state.setListConfigId(listConfigId);

    if (!this.state.listConfigId && this.state.listConfigs.length) {
      console.log('in restoreState...', this.state.listConfigs[0].id);
      this.state.setListConfigId(this.state.listConfigs[0].id);
    }

    this.state.setListContextMode(storage.getListContextMode());
    this.state.setListContext(storage.getListContext());

    this.state.setAdvancedMode(storage.getAdvancedMode());
    this.state.setDebugMode(storage.getDebugMode());

    const view = storage.getSavedView();
    if (view) {
      this.view = view;
    }
  }

  private _handleViewChanged(e: Event) {
    const event = e as CustomEvent;
    this.view = event.detail;
    storage.saveView(this.view);
  }

  private _handleOperationPerformed(e: OperationPerformedEvent) {
    this.viewComponent.sync();
  }

  private _handleListConfigChanged(e: OperationPerformedEvent) {
    this.viewComponent.sync();
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
      <list-config
        @list-config-changed=${this._handleListConfigChanged}
      ></list-config>
      <action-nav active=${this.view}></action-nav>
      <bulk-manager
        @operation-performed=${this._handleOperationPerformed}
      ></bulk-manager>
      <main>${this._activeView()}</main>
      <action-toasts></action-toasts>
      <floating-widget></floating-widget>
    `;
  }
}

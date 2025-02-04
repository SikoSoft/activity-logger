import { html, nothing } from 'lit';
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
import '@/components/forbidden-notice';
import '@/components/bulk-manager';
import '@/components/list-config';

import { theme } from './styles/theme';
import { api } from './lib/Api';
import { ListFilterType } from 'api-spec/models/List';

export interface ViewChangedEvent extends CustomEvent {
  detail: ActionView;
}

@customElement('activity-logger')
export class ActivityLogger extends MobxLitElement {
  public state = appState;
  static styles = [theme];

  @state() view: ActionView = defaultActionView;
  @state() ready: boolean = false;
  @query('main > *') viewComponent!: ViewElement;

  connectedCallback(): void {
    super.connectedCallback();
    api.setAuthToken(storage.getAuthToken());
    this.addEventListener('view-changed', (e: Event) => {
      this._handleViewChanged(e);
    });

    this._restoreState();
  }

  private async _restoreState() {
    console.log('restoreState');
    this.ready = false;
    try {
      const listConfigs = await storage.getListConfigs();
      this.state.setListConfigs(listConfigs);

      const listConfigId = storage.getActiveListConfigId();
      this.state.setListConfigId(listConfigId);

      if (!this.state.listConfigId && this.state.listConfigs.length) {
        console.log('in restoreState...', this.state.listConfigs[0].id);
        this.state.setListConfigId(this.state.listConfigs[0].id);
      }

      this.state.setListContextMode(storage.getListContextMode());
      this.state.setListContext(storage.getListContext());

      this.state.setAdvancedMode(storage.getAdvancedMode());
      this.state.setDebugMode(storage.getDebugMode());
      this.state.setAuthToken(storage.getAuthToken());

      const view = storage.getSavedView();
      if (view) {
        this.view = view;
      }
    } catch (error) {
      console.error('something went wrong during restore state', error);
    } finally {
      console.log('set ready to true');
      this.ready = true;
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

  private _handleUserLoggedIn() {
    this._restoreState();
  }

  _activeView() {
    switch (this.view) {
      case ActionView.INPUT:
        return html`<action-form
          .tags=${this.state.listConfig.filter.tagging[
            ListFilterType.CONTAINS_ALL_OF
          ]}
        ></action-form>`;
    }
    return html`<action-list></action-list>`;
  }

  renderContent() {
    console.log(
      'ready',
      this.ready,
      'forbidden',
      this.state.forbidden,
      'authToken',
      this.state.authToken,
    );
    if (this.ready && (this.state.forbidden || !this.state.authToken)) {
      return html`
        <forbidden-notice
          @user-logged-in=${this._handleUserLoggedIn}
        ></forbidden-notice>
      `;
    }

    return this.ready
      ? html`
          <list-config
            @list-config-changed=${this._handleListConfigChanged}
          ></list-config>
          <action-nav active=${this.view}></action-nav>
          <bulk-manager
            @operation-performed=${this._handleOperationPerformed}
          ></bulk-manager>
          <main>${this._activeView()}</main>
          <floating-widget></floating-widget>
        `
      : html`<ss-loader></ss-loader>`;
  }

  render() {
    return html`
      ${this.renderContent()}
      <action-toasts></action-toasts>
    `;
  }
}

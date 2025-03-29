import { html, nothing } from 'lit';
import { customElement, query, state } from 'lit/decorators.js';
import { MobxLitElement } from '@adobe/lit-mobx';

import { ActionView, defaultActionView } from '@/models/Action';
import { storage } from '@/lib/Storage';
import { appState } from '@/state';
import { ViewElement } from '@/lib/ViewElement';

import { OperationPerformedEvent } from '@/components/bulk-manager/bulk-manager.events';
import { ListConfigChangedEvent } from '@/components/list-config/list-config.events';

import '@/components/action-nav/action-nav';
import '@/components/action-form/action-form';
import '@/components/action-list/action-list';
import '@/components/floating-widget/floating-widget';
import '@/components/forbidden-notice/forbidden-notice';
import '@/components/bulk-manager/bulk-manager';
import '@/components/list-config/list-config';

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
    this.setAuthToken(storage.getAuthToken());
    this.addEventListener('view-changed', (e: Event) => {
      this._handleViewChanged(e);
    });

    this._restoreState();
  }

  setAuthToken(authToken: string) {
    api.setAuthToken(authToken);
    this.state.setAuthToken(authToken);
  }

  private async _restoreState() {
    this.ready = false;
    try {
      if (this.state.authToken) {
        const listConfigs = await storage.getListConfigs();
        this.state.setListConfigs(listConfigs);

        const listConfigId = storage.getActiveListConfigId();
        this.state.setListConfigId(listConfigId);
      }

      if (!this.state.listConfigId && this.state.listConfigs.length) {
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
    } catch (error) {
      console.error('something went wrong during restore state', error);
    } finally {
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

  private _handleListConfigChanged(e: ListConfigChangedEvent) {
    this.viewComponent.sync();
  }

  private _handleUserLoggedIn() {
    this._restoreState();
  }

  _activeView() {
    if (!this.state.listConfig) {
      return nothing;
    }
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

  render() {
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
}

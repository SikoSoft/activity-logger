import { html, nothing } from 'lit';
import { customElement, query, state } from 'lit/decorators.js';
import { MobxLitElement } from '@adobe/lit-mobx';

import { PageView, defaultPageView } from '@/models/Page';
import { storage } from '@/lib/Storage';
import { appState } from '@/state';
import { ViewElement } from '@/lib/ViewElement';

import { OperationPerformedEvent } from '@/components/bulk-manager/bulk-manager.events';
import { ListConfigChangedEvent } from '@/components/list-config/list-config.events';

import '@/components/page-nav/page-nav';
import '@/components/action-form/action-form';
import '@/components/action-list/action-list';
import '@/components/entity-form/entity-form';
import '@/components/entity-list/entity-list';
import '@/components/admin-dashboard/admin-dashboard';
import '@/components/floating-widget/floating-widget';
import '@/components/forbidden-notice/forbidden-notice';
import '@/components/bulk-manager/bulk-manager';
import '@/components/list-config/list-config';

import { theme } from './styles/theme';
import { api } from './lib/Api';
import { ListFilterType } from 'api-spec/models/List';
import { Version } from './models/Version';

export interface ViewChangedEvent extends CustomEvent {
  detail: PageView;
}

@customElement('activity-logger')
export class ActivityLogger extends MobxLitElement {
  public state = appState;
  static styles = [theme];

  @state() view: PageView = defaultPageView;
  @state() ready: boolean = false;
  @query('main > *') viewComponent!: ViewElement;

  connectedCallback(): void {
    super.connectedCallback();

    this.setAuthToken(storage.getAuthToken());

    this.addEventListener('view-changed', (e: Event) => {
      this.handleViewChanged(e);
    });

    this.restoreState();
  }

  setAuthToken(authToken: string) {
    api.setAuthToken(authToken);
    this.state.setAuthToken(authToken);
  }

  private async restoreState() {
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

      this.state.setVersion(storage.getVersion());

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

  private handleViewChanged(e: Event) {
    const event = e as CustomEvent;
    this.view = event.detail;
    storage.saveView(this.view);
  }

  private handleOperationPerformed(e: OperationPerformedEvent) {
    this.viewComponent.sync(false);
  }

  private handleListConfigChanged(e: ListConfigChangedEvent) {
    this.viewComponent.sync(true);
  }

  private handleUserLoggedIn() {
    this.restoreState();
  }

  activeView() {
    if (!this.state.listConfig) {
      return nothing;
    }

    if (this.view === PageView.ADMIN) {
      return html`<admin-dashboard></admin-dashboard>`;
    }

    if (this.state.version === Version.V2) {
      if (this.view === PageView.INPUT) {
        return html`<entity-form
          .tags=${this.state.listConfig.filter.tagging[
            ListFilterType.CONTAINS_ALL_OF
          ]}
        ></entity-form>`;
      }

      return html`<entity-list></entity-list>`;
    }

    if (this.view === PageView.INPUT) {
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
          @user-logged-in=${this.handleUserLoggedIn}
        ></forbidden-notice>
      `;
    }

    return this.ready
      ? html`
          <list-config
            @list-config-changed=${this.handleListConfigChanged}
          ></list-config>

          <page-nav active=${this.view}></page-nav>

          <bulk-manager
            @operation-performed=${this.handleOperationPerformed}
          ></bulk-manager>

          <main>${this.activeView()}</main>

          <floating-widget></floating-widget>
        `
      : html`<ss-loader></ss-loader>`;
  }
}

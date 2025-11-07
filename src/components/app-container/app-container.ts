import { html, nothing, TemplateResult } from 'lit';
import { customElement, query, state } from 'lit/decorators.js';
import { MobxLitElement } from '@adobe/lit-mobx';

import { ListFilterType } from 'api-spec/models/List';
import { PageView, defaultPageView } from '@/models/Page';
import { storage } from '@/lib/Storage';
import { appState } from '@/state';
import { ViewElement } from '@/lib/ViewElement';
import { api } from '@/lib/Api';
import { Version } from '@/models/Version';

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

import { theme } from '@/styles/theme';
import { CollapsableToggledEvent } from '@ss/ui/components/ss-collapsable.events';
import { TabIndexChangedEvent } from '@ss/ui/components/tab-container.events';

export interface ViewChangedEvent extends CustomEvent {
  detail: PageView;
}

@customElement('app-container')
export class AppContainer extends MobxLitElement {
  public state = appState;
  static styles = [theme];

  @state() view: PageView = defaultPageView;
  @state() ready: boolean = false;
  @query('main > *') viewComponent!: ViewElement;

  connectedCallback(): void {
    super.connectedCallback();

    //document.body.classList.add('app-loaded');

    this.setAuthToken(storage.getAuthToken());

    this.addEventListener('view-changed', (e: Event) => {
      this.handleViewChanged(e);
    });

    window.addEventListener('unload', () => {
      storage.setWindowScrollPosition(window.scrollX, window.scrollY);
    });

    window.addEventListener('view-ready', () => {
      const { x, y } = storage.getWindowScrollPosition();
      setTimeout(() => {
        window.scrollTo(x, y);
      }, 1);
    });

    this.restoreState();
  }

  setAuthToken(authToken: string): void {
    api.setAuthToken(authToken);
    this.state.setAuthToken(authToken);
  }

  private async restoreState(): Promise<void> {
    this.ready = false;
    try {
      if (this.state.authToken) {
        const listConfigs = await storage.getListConfigs();
        this.state.setListConfigs(listConfigs);

        const entityConfigs = await storage.getEntityConfigs();
        this.state.setEntityConfigs(entityConfigs);

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

      this.state.setCollapsableState(storage.getCollapsablePanelState());
      this.state.setTabState(storage.getTabState());

      this.state.setVersion(storage.getVersion());

      this.state.setTheme(storage.getTheme());

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

  private handleViewChanged(e: Event): void {
    const event = e as CustomEvent;
    this.view = event.detail;
    storage.saveView(this.view);
  }

  private handleOperationPerformed(_e: OperationPerformedEvent): void {
    this.viewComponent.sync(false);
  }

  private handleListConfigChanged(_e: ListConfigChangedEvent): void {
    this.viewComponent.sync(true);
  }

  private handleUserLoggedIn(): void {
    this.restoreState();
  }

  private handleCollapsableToggled(e: CollapsableToggledEvent): void {
    const { isOpen, panelId } = e.detail;
    this.state.setCollapsablePanelState(panelId, isOpen);
    storage.setCollapsablePanelState(this.state.collapsablePanelState);
  }

  private handleTabChanged(e: TabIndexChangedEvent): void {
    const { index, paneId } = e.detail;
    this.state.setTabPaneState(paneId, index);
    storage.setTabState(this.state.tabState);
  }

  activeView(): TemplateResult | typeof nothing {
    if (!this.state.listConfig) {
      return nothing;
    }

    if (this.view === PageView.ADMIN) {
      return html`<admin-dashboard></admin-dashboard>`;
    }

    if (this.state.version === Version.V2) {
      if (this.view === PageView.INPUT) {
        return html`<entity-form
          type=${this.state.listConfig.filter.includeTypes[0] || 0}
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

  renderContent(): TemplateResult | typeof nothing {
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

  render(): TemplateResult {
    return html`
      <div
        class="app-container"
        @tab-index-changed=${this.handleTabChanged}
        @collapsable-toggled=${this.handleCollapsableToggled}
      >
        ${this.renderContent()}
      </div>
    `;
  }
}

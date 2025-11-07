import { css, html, TemplateResult } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import '@/components/app-container/app-container';
import { theme } from '@/styles/theme';
import { MobxLitElement } from '@adobe/lit-mobx';
import { appState } from '@/state';
import { classMap } from 'lit/directives/class-map.js';
import {
  PageContainerProp,
  PageContainerProps,
  pageContainerProps,
} from './page-container.models';
import { reaction } from 'mobx';

@customElement('page-container')
export class PageContainer extends MobxLitElement {
  private state = appState;

  static styles = [
    theme,
    css`
      :host {
        display: block;
        margin-top: 0rem;
        padding: 1rem;
        background-color: var(--background-color);
      }

      app-container {
        display: block;
        margin: auto;
        max-width: 640px;
      }
    `,
  ];

  @property({ reflect: true })
  [PageContainerProp.THEME]: PageContainerProps[PageContainerProp.THEME] =
    pageContainerProps[PageContainerProp.THEME].default;

  get classes(): Record<string, boolean> {
    return {
      'page-container': true,
    };
  }

  connectedCallback(): void {
    super.connectedCallback();
    this.theme = this.state.theme;

    reaction(
      () => appState.theme,
      () => {
        this.theme = this.state.theme;
      },
      {
        fireImmediately: false,
      },
    );
  }

  render(): TemplateResult {
    return html`
      <div class=${classMap(this.classes)}>
        <app-container></app-container>
      </div>
    `;
  }
}

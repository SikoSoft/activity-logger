import { css, html, TemplateResult } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';

import '@/components/app-container/app-container';
import { backgroundColorMap, theme } from '@/styles/theme';
import { MobxLitElement } from '@adobe/lit-mobx';
import { appState } from '@/state';
import { classMap } from 'lit/directives/class-map.js';
import {
  PageContainerProp,
  PageContainerProps,
  pageContainerProps,
} from './page-container.models';
import { reaction } from 'mobx';
import { Theme, defaultTheme } from '@/models/Page';
import { StorageItemKey } from '@/models/Storage';

@customElement('page-container')
export class PageContainer extends MobxLitElement {
  private state = appState;

  static styles = [
    theme,
    css`
      :host {
        display: block;
        margin-top: 0rem;
        padding: 2rem;
        background-color: var(--background-color);
        min-height: 100vh;
        overflow: hidden;
      }

      .page-container {
        &.overlay-is-open .overlay {
          opacity: 1;
        }
      }

      .overlay {
        position: fixed;
        z-index: 100;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(
          var(--overlay-color-top),
          var(--overlay-color-bottom)
        );
        opacity: 0;
        pointer-events: none;
        transition: opacity 0.2s;
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

  @state()
  get classes(): Record<string, boolean> {
    return {
      'page-container': true,
      'overlay-is-open': this.state.widgetIsOpen,
    };
  }

  setTheme(theme: Theme): void {
    this.theme = theme;
    const backgroundColor = backgroundColorMap[this.state.theme];
    document.body.style.backgroundColor = backgroundColor.cssText;
  }

  getThemeFromStorage(): Theme {
    const storedTheme = localStorage.getItem(StorageItemKey.THEME);
    if (storedTheme && Object.values(Theme).includes(storedTheme as Theme)) {
      return storedTheme as Theme;
    }

    return defaultTheme;
  }

  connectedCallback(): void {
    super.connectedCallback();
    this.setTheme(this.getThemeFromStorage());
    reaction(
      () => appState.theme,
      () => {
        this.setTheme(this.state.theme);
      },
      {
        fireImmediately: false,
      },
    );
  }

  render(): TemplateResult {
    return html`
      <div class=${classMap(this.classes)}>
        <div class="overlay"></div>
        <app-container></app-container>
      </div>
    `;
  }
}

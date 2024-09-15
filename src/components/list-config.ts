import { MobxLitElement } from '@adobe/lit-mobx';
import { css, html } from 'lit';
import { customElement } from 'lit/decorators.js';

import { appState } from '@/state';

import '@/components/ss-select';

import { theme } from '@/styles/theme';

@customElement('list-config')
export class ListConfig extends MobxLitElement {
  static styles = [
    theme,
    css`
      .box {
        padding: 1rem;
      }
    `,
  ];

  private state = appState;

  render() {
    return html` <div class="box">${this.state.listConfig.name}</div> `;
  }
}

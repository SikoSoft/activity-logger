import { appState } from '@/state';
import { theme } from '@/styles/theme';
import { MobxLitElement } from '@adobe/lit-mobx';
import { css, html, LitElement } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';

@customElement('bulk-manager')
export class BulkManager extends MobxLitElement {
  private state = appState;

  static styles = [
    theme,
    css`
      .bulk-manager {
        position: sticky;
        top: 0;
        left: 0;
        padding: 1rem;
        box-shadow: 0 0 10px #000;
        display: none;

        &.shown {
          display: block;
        }
      }
    `,
  ];

  @state()
  get classes() {
    return {
      box: true,
      'bulk-manager': true,
      shown: this.state.selectedActions.length > 0,
    };
  }

  render() {
    return html` <div class=${classMap(this.classes)}>bulk manager</div> `;
  }
}

import { theme } from '@/styles/theme';
import { css, html, LitElement, nothing } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import {
  MockEntitiesProp,
  mockEntitiesProps,
  MockEntitiesProps,
} from './mock-entities.models';

import '@ss/ui/components/ss-button';

@customElement('mock-entities')
export class MockEntities extends LitElement {
  static styles = [
    theme,
    css`
      :host {
        display: block;
      }
      .paginator {
        margin-top: 1rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0.25rem;
      }

      .pages {
        display: flex;
        gap: 0.25rem;
      }

      .quick-page {
        color: #777;

        &.active {
          color: #000;
          font-weight: bold;
        }
      }

      button {
        cursor: pointer;
        border-radius: 8px;
        border: 1px #aaa solid;
        transition: all 0.2s;

        &:hover {
          background-color: #ccc;
        }
      }
      button:disabled {
        cursor: not-allowed;
        opacity: 0.5;
      }
    `,
  ];

  render() {
    return html`<div class="mock-entities">Mock Entities</div>`;
  }
}

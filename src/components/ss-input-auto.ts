import { MobxLitElement } from '@adobe/lit-mobx';
import { html, css, nothing } from 'lit';
import { property, customElement, state } from 'lit/decorators.js';
import { repeat } from 'lit/directives/repeat.js';

import { appState } from '@/state';

import { theme } from '@/styles/theme';

@customElement('ss-input-auto')
export class SSInputAuto extends MobxLitElement {
  static styles = [
    theme,
    css`
      div {
        position: relative;
      }

      ul {
        z-index: 100;
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        list-style: none;
        padding: 0;
        margin: 0;
        box-sizing: border-box;
        overflow: hidden;
      }

      li {
        padding: 0.5rem;
        background-color: #fff;
        transition: all 0.2s;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        height: 2rem;
        line-height: 2rem;
        color: #888;
      }

      li.selected {
        color: #000;
        background-color: #ddd;
      }
    `,
  ];

  private state = appState;

  @property() input: string = '';
  @property({ type: Number }) maxMatches: number = 5;
  @property({ type: Number }) minInput: number = 1;
  @state() selectedIndex: number = -1;

  @state()
  get show(): boolean {
    return (
      this.state.actionSuggestions.length > 0 &&
      this.input.length >= this.minInput
    );
  }

  get maxSelectedIndex(): number {
    return this.state.actionSuggestions.length - 1;
  }

  connectedCallback(): void {
    super.connectedCallback();

    this.addEventListener('select-up', () => {
      this._adjustSelectedIndex(-1);
    });

    this.addEventListener('select-down', () => {
      this._adjustSelectedIndex(1);
    });

    this.addEventListener('select', () => {
      if (this.state.actionSuggestions.length && this.selectedIndex !== -1) {
        this._sendSelectedEvent(
          this.state.actionSuggestions[this.selectedIndex],
        );
      } else {
        this._sendSubmitEvent();
      }
    });
  }

  private _adjustSelectedIndex(adjustment: number): void {
    let newIndex = this.selectedIndex + adjustment;
    if (newIndex < -1) {
      newIndex = this.maxSelectedIndex;
    }
    if (newIndex > this.maxSelectedIndex) {
      newIndex = -1;
    }
    this.selectedIndex = newIndex;
  }

  private _sendSelectedEvent(suggestion: string) {
    this.dispatchEvent(
      new CustomEvent('suggestion-selected', {
        bubbles: true,
        composed: true,
        detail: suggestion,
      }),
    );
  }

  private _sendSubmitEvent() {
    this.dispatchEvent(
      new CustomEvent('submit', {
        bubbles: true,
        composed: true,
      }),
    );
  }

  render() {
    return html`
      <div>
        ${this.show
          ? html` <ul class="box">
              ${repeat(
                this.state.actionSuggestions,
                suggestion => suggestion,
                (suggestion, index) => html`
                  <li
                    class=${index === this.selectedIndex ? 'selected' : ''}
                    @mouseover=${() => (this.selectedIndex = index)}
                    @click=${() => this._sendSelectedEvent(suggestion)}
                  >
                    ${suggestion}
                  </li>
                `,
              )}
            </ul>`
          : nothing}
      </div>
    `;
  }
}

import { html, css, nothing, LitElement } from 'lit';
import { property, customElement, state } from 'lit/decorators.js';
import { repeat } from 'lit/directives/repeat.js';

import {
  SuggestionChangedEvent,
  SuggestionSubmittedEvent,
} from './ss-input-auto.events';

import { theme } from '../../styles/theme';
import {
  SSInputAutoProp,
  SSInputAutoProps,
  ssInputAutoProps,
} from './ss-input-auto.models';

@customElement('ss-input-auto')
export class SSInputAuto extends LitElement {
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
        text-align: left;
      }

      li.selected {
        color: #000;
        background-color: #ddd;
      }
    `,
  ];

  @property()
  [SSInputAutoProp.INPUT]: SSInputAutoProps[SSInputAutoProp.INPUT] =
    ssInputAutoProps[SSInputAutoProp.INPUT].default;

  @property({ type: Number })
  [SSInputAutoProp.MIN_INPUT]: SSInputAutoProps[SSInputAutoProp.MIN_INPUT] =
    ssInputAutoProps[SSInputAutoProp.MIN_INPUT].default;

  @property({ type: Number })
  [SSInputAutoProp.MAX_MATCHES]: SSInputAutoProps[SSInputAutoProp.MAX_MATCHES] =
    ssInputAutoProps[SSInputAutoProp.MAX_MATCHES].default;

  @property({ type: Array })
  [SSInputAutoProp.SUGGESTIONS]: SSInputAutoProps[SSInputAutoProp.SUGGESTIONS] =
    ssInputAutoProps[SSInputAutoProp.SUGGESTIONS].default;

  @state() selectedIndex: number = -1;

  @state()
  get show(): boolean {
    return this.suggestions.length > 0 && this.input.length >= this.minInput;
  }

  get maxSelectedIndex(): number {
    return this.suggestions.length - 1;
  }

  connectedCallback(): void {
    super.connectedCallback();

    this.addEventListener('select-up', () => {
      this.adjustSelectedIndex(-1);
    });

    this.addEventListener('select-down', () => {
      this.adjustSelectedIndex(1);
    });

    this.addEventListener('select', () => {
      if (this.suggestions.length && this.selectedIndex !== -1) {
        this.sendSelectedEvent(this.suggestions[this.selectedIndex]);
      } else {
        this.sendSubmitEvent();
      }
    });
  }

  private adjustSelectedIndex(adjustment: number): void {
    let newIndex = this.selectedIndex + adjustment;
    if (newIndex < -1) {
      newIndex = this.maxSelectedIndex;
    }
    if (newIndex > this.maxSelectedIndex) {
      newIndex = -1;
    }
    this.selectedIndex = newIndex;
  }

  private sendSelectedEvent(suggestion: string) {
    this.dispatchEvent(new SuggestionChangedEvent({ value: suggestion }));
  }

  private sendSubmitEvent() {
    this.dispatchEvent(
      new SuggestionSubmittedEvent({ selectedIndex: this.selectedIndex }),
    );
  }

  render() {
    return html`
      <div>
        ${this.show
          ? html` <ul class="box">
              ${repeat(
                this.suggestions,
                suggestion => suggestion,
                (suggestion, index) => html`
                  <li
                    class=${index === this.selectedIndex ? 'selected' : ''}
                    @mouseover=${() => (this.selectedIndex = index)}
                    @click=${() => this.sendSelectedEvent(suggestion)}
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

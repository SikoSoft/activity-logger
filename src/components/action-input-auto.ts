import { MobxLitElement } from '@adobe/lit-mobx';
import { html, css, nothing } from 'lit';
import { property, customElement, state } from 'lit/decorators.js';
import { repeat } from 'lit/directives/repeat.js';
import { appState } from '../state';

@customElement('action-input-auto')
export class ActionInputAuto extends MobxLitElement {
  static styles = css`
    div {
      position: relative;
    }

    ul {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      list-style: none;
      padding: 0;
      margin: 0;
    }

    li {
      padding: 0.5rem;
      background-color: #fff;
    }

    li.selected {
      background-color: #ddd;
    }
  `;

  private state = appState;

  @property() input: string = '';
  @state() selectedIndex: number = 0;

  @state()
  get suggestionMatches(): string[] {
    return this.state.suggestions.filter(suggestion =>
      suggestion.match(new RegExp(`^${this.input}`))
    );
  }

  get maxSelectedIndex(): number {
    return this.suggestionMatches.length - 1;
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
      this._sendSelectedEvent(this.suggestionMatches[this.selectedIndex]);
    });
  }

  private _adjustSelectedIndex(adjustment: number): void {
    let newIndex = this.selectedIndex + adjustment;
    if (newIndex < 0) {
      newIndex = this.maxSelectedIndex;
    }
    if (newIndex > this.maxSelectedIndex) {
      newIndex = 0;
    }
    this.selectedIndex = newIndex;
  }

  private _sendSelectedEvent(suggestion: string) {
    this.dispatchEvent(
      new CustomEvent('suggestion-selected', {
        bubbles: true,
        composed: true,
        detail: suggestion,
      })
    );
  }

  render() {
    return html`
      <div>
        ${this.suggestionMatches.length
          ? html` <ul>
              ${repeat(
                this.suggestionMatches,
                suggestion => suggestion,
                (suggestion, index) =>
                  html`
                    <li
                      class=${index === this.selectedIndex ? 'selected' : ''}
                      @mouseover=${() => (this.selectedIndex = index)}
                      @click=${() => this._sendSelectedEvent(suggestion)}
                    >
                      ${suggestion}
                    </li>
                  `
              )}
            </ul>`
          : nothing}
      </div>
    `;
  }
}

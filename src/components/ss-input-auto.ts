import { MobxLitElement } from '@adobe/lit-mobx';
import { LitElement, html, css, nothing, PropertyValueMap } from 'lit';
import { property, customElement, state } from 'lit/decorators.js';
import { repeat } from 'lit/directives/repeat.js';
import { appState } from '../state';
import { theme } from '../styles/theme';

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
  @state() selectedIndex: number = 0;

  /*
  @state()
  get suggestionMatches(): string[] {
    console.log(
      'suggestionMatches',
      this.input,
      JSON.stringify(this.state.suggestions)
    );
    return this.state.suggestions.length
      ? this.state.suggestions
          .filter(suggestion => {
            return suggestion.match(new RegExp(`^${this.input}`));
          })
          .slice(0, this.maxMatches)
      : [];
  }
*/
  get maxSelectedIndex(): number {
    return this.state.suggestions.length - 1;
    //return this.suggestionMatches.length - 1;
  }

  updated(
    changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>
  ) {
    super.updated(changedProperties);
    console.log({ changedProperties });
  }

  connectedCallback(): void {
    super.connectedCallback();
    console.log('AUTO connectedCallback');

    this.addEventListener('select-up', () => {
      this._adjustSelectedIndex(-1);
    });

    this.addEventListener('select-down', () => {
      this._adjustSelectedIndex(1);
    });

    this.addEventListener('select', () => {
      if (this.state.suggestions.length) {
        this._sendSelectedEvent(this.state.suggestions[this.selectedIndex]);
        //this._sendSelectedEvent(this.suggestionMatches[this.selectedIndex]);
      } else {
        this._sendSubmitEvent();
      }
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

  private _sendSubmitEvent() {
    this.dispatchEvent(
      new CustomEvent('submit', {
        bubbles: true,
        composed: true,
      })
    );
  }

  render() {
    return html`
      <div>state suggestions: ${this.state.suggestions.length}</div>
      <div>
        ${this.state.suggestions.length
          ? html` <ul class="box">
              ${repeat(
                this.state.suggestions,
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

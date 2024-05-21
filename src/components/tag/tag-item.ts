import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators.js';

@customElement('tag-item')
export class TagItem extends LitElement {
  render() {
    return html` <li class="tag-item"></li> `;
  }
}

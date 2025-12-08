import { ViewElement } from '@/lib/ViewElement';
import { html, LitElement, TemplateResult } from 'lit';
import { customElement } from 'lit/decorators.js';

@customElement('public-entity-list')
export class PublicEntityList extends ViewElement {
  render(): TemplateResult {
    return html`<entity-list></entity-list>`;
  }
}

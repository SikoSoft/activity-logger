import { html, TemplateResult } from 'lit';
import { customElement, query } from 'lit/decorators.js';

import '@/components/public-entity-list/public-entity-list';

import { ViewElement } from '@/lib/ViewElement';
import { PublicEntityList } from '@/components/public-entity-list/public-entity-list';

@customElement('public-list-view')
export class PublicListView extends ViewElement {
  @query('public-entity-list')
  publicEntityList: PublicEntityList | undefined;

  sync(reset: boolean): void {
    if (this.publicEntityList) {
      this.publicEntityList.sync(reset);
    }
  }
  render(): TemplateResult {
    return html`<public-entity-list></public-entity-list>`;
  }
}

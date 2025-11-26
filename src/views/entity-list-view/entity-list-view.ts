import { html, TemplateResult } from 'lit';
import { customElement, query } from 'lit/decorators.js';

import '@/components/entity-list/entity-list';
import '@/components/login-form/login-form';
import '@/components/logged-in/logged-in';
import '@/components/logged-out/logged-out';
import { ViewElement } from '@/lib/ViewElement';
import { EntityList } from '@/components/entity-list/entity-list';

@customElement('entity-list-view')
export class EntityListView extends ViewElement {
  @query('entity-list')
  entityList: EntityList | undefined;

  sync(reset: boolean): void {
    if (this.entityList) {
      this.entityList.sync(reset);
    }
  }
  render(): TemplateResult {
    return html` <logged-out
        ><template><login-form></login-form></template
      ></logged-out>
      <logged-in
        ><template><entity-list></entity-list></template
      ></logged-in>`;
  }
}

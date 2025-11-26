import { html, TemplateResult } from 'lit';
import { customElement, query } from 'lit/decorators.js';

import '@/components/entity-form/entity-form';
import '@/components/login-form/login-form';
import '@/components/logged-in/logged-in';
import '@/components/logged-out/logged-out';
import { ViewElement } from '@/lib/ViewElement';
import { EntityForm } from '@/components/entity-form/entity-form';

@customElement('entity-form-view')
export class EntityFormView extends ViewElement {
  @query('entity-form')
  entityForm: EntityForm | undefined;

  sync(reset: boolean): void {
    if (this.entityForm) {
      this.entityForm.sync(reset);
    }
  }

  render(): TemplateResult {
    return html` <logged-out
        ><template><login-form></login-form></template
      ></logged-out>
      <logged-in
        ><template><entity-form></entity-form></template
      ></logged-in>`;
  }
}

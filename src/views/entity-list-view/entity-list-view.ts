import { html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';

import '@/components/entity-list/entity-list';
import '@/components/login-form/login-form';
import '@/components/logged-in/logged-in';
import '@/components/logged-out/logged-out';

@customElement('entity-list-view')
export class EntityListView extends LitElement {
  render() {
    return html` <logged-out
        ><template><login-form></login-form></template
      ></logged-out>
      <logged-in
        ><template><entity-list></entity-list></template
      ></logged-in>`;
  }
}

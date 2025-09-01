import { LitElement, html, css } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import {
  EntityConfigFormProps,
  entityConfigFormProps,
} from './entity-config-form.models';
import { EntityConfigFormUpdatedEvent } from './entity-config-form.events';

@customElement('entity-config-form')
export class EntityConfigForm extends LitElement {
  @state() private props: EntityConfigFormProps = entityConfigFormProps;

  static styles = css`
    :host {
      display: block;
      padding: 1rem;
    }
  `;

  render() {
    return html`
      <div class="entity-config-form">
        <h2>Entity Configuration</h2>
        <div>Placeholder for entity configuration form</div>
      </div>
    `;
  }

  /**
   * Dispatches an event when the entity config form is updated
   */
  private dispatchConfigUpdated() {
    this.dispatchEvent(new EntityConfigFormUpdatedEvent(this.props));
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'entity-config-form': EntityConfigForm;
  }
}

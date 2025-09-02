import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import {
  EntityConfigFormProps,
  entityConfigFormProps,
} from './entity-config-form.models';
import { EntityConfigFormUpdatedEvent } from './entity-config-form.events';
import { defaultEntityConfig, EntityConfig } from '@/models/Entity';

@customElement('entity-config-form')
export class EntityConfigForm extends LitElement {
  @state()
  entityConfig: EntityConfig = defaultEntityConfig;

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
}

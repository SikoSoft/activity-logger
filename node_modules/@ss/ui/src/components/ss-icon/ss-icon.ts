import { LitElement, html, css, nothing } from 'lit';
import { property, customElement } from 'lit/decorators.js';

import './svg/svg-profile';
import './svg/svg-arrow-circle-left';
import './svg/svg-arrow-circle-right';
import './svg/svg-valid-circle';
import './svg/svg-invalid-circle';
import './svg/svg-gear';
import './svg/svg-delete';

import { theme } from '../../styles/theme';
import {
  IconName,
  SSIconProp,
  SSIconProps,
  ssIconProps,
} from './ss-icon.models';

@customElement('ss-icon')
export class SSIcon extends LitElement {
  static styles = [
    theme,

    css`
      :host {
        display: inline-block;
        vertical-align: middle;
        width: var(--size, 24px);
        height: var(--size, 24px);
      }

      .icon {
        display: inline-block;
        width: var(--size, 24px);
        height: var(--size, 24px);

        & > * {
          display: inline-block;
          width: 100%;
          height: 100%;
          color: var(--color, #000);
        }
      }
    `,
  ];

  @property()
  [SSIconProp.NAME]: SSIconProps[SSIconProp.NAME] =
    ssIconProps[SSIconProp.NAME].default;

  @property()
  [SSIconProp.COLOR]: SSIconProps[SSIconProp.COLOR] =
    ssIconProps[SSIconProp.COLOR].default;

  @property({ type: Number })
  [SSIconProp.SIZE]: SSIconProps[SSIconProp.SIZE] =
    ssIconProps[SSIconProp.SIZE].default;

  updated(changedProperties: Map<string | number | symbol, unknown>) {
    super.updated(changedProperties);
    if (changedProperties.has(SSIconProp.SIZE)) {
      this.style.setProperty('--size', `${this[SSIconProp.SIZE]}px`);
    }
  }

  renderIcon() {
    switch (this[SSIconProp.NAME]) {
      case IconName.PROFILE:
        return html`<svg-profile></svg-profile>`;
      case IconName.ARROW_CIRCLE_LEFT:
        return html`<svg-arrow-circle-left></svg-arrow-circle-left>`;
      case IconName.ARROW_CIRCLE_RIGHT:
        return html`<svg-arrow-circle-right></svg-arrow-circle-right>`;
      case IconName.VALID_CIRCLE:
        return html`<svg-valid-circle></svg-valid-circle>`;
      case IconName.INVALID_CIRCLE:
        return html`<svg-invalid-circle></svg-invalid-circle>`;
      case IconName.GEAR:
        return html`<svg-gear></svg-gear>`;
      case IconName.DELETE:
        return html`<svg-delete></svg-delete>`;
      default:
        return nothing;
    }
  }

  render() {
    return html`
      <span
        class="icon"
        style="--color: ${this[SSIconProp.COLOR]}; --size: ${this[
          SSIconProp.SIZE
        ]}px;"
      >
        ${this.renderIcon()}
      </span>
    `;
  }
}

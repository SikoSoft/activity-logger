import { LitElement, css, html } from 'lit';
import { customElement } from 'lit/decorators.js';

import { translate } from '@/lib/Localization';

@customElement('import-tool')
export class ImportTool extends LitElement {
  static styles = css`
    textarea {
      width: 100%;
      height: 200px;
      font-family: monospace;
      font-size: 0.9rem;
      box-sizing: border-box;
    }
  `;

  render() {
    return html` <div class="import">
      <textarea></textarea>

      <div class="buttons">
        <ss-button>${translate('importData')}</ss-button>
      </div>
    </div>`;
  }
}

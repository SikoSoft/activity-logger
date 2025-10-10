import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators.js';

@customElement('export-tool')
export class ExportTool extends LitElement {
  render() {
    return html` <div class="export-tool">Export</div> `;
  }
}

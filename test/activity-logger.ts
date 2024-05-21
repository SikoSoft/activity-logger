import { html } from 'lit';
import { fixture, expect } from '@open-wc/testing';

import type { ActivityLogger } from '../src/activity-logger.js';
import '../src/food-journal.js';

describe('ActivityLogger', () => {
  let element: ActivityLogger;
  beforeEach(async () => {
    element = await fixture(html`<activity-logger></activity-logger>`);
  });

  it('renders a h1', () => {
    const h1 = element.shadowRoot!.querySelector('h1')!;
    expect(h1).to.exist;
    expect(h1.textContent).to.equal('My app');
  });

  it('passes the a11y audit', async () => {
    await expect(element).shadowDom.to.be.accessible();
  });
});

import { html } from 'lit';
import { fixture, expect } from '@open-wc/testing';

import type { FoodJournal } from '../src/food-journal.js';
import '../src/food-journal.js';

describe('FoodJournal', () => {
  let element: FoodJournal;
  beforeEach(async () => {
    element = await fixture(html`<food-journal></food-journal>`);
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

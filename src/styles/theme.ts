import { Theme } from '@/models/Page';
import { css, CSSResult } from 'lit';

export const backgroundColorMap: Record<Theme, CSSResult> = {
  [Theme.LIGHT]: css`#ededed`,
  [Theme.DARK]: css`#12221a`,
};

export const theme = css`
  :host([theme='light']) {
    --negative-color: #600;
    --negative-background-color: #ffc4c4;
    --positive-color: #060;
    --positive-background-color: #c4ffc4;
    --unsynced-color: #666;
    --unsynced-background-color: #c4c4c4;
    --primary-color: #0066ff;
    --border-color: #ccc;
    --border-radius: 0.5rem;
    --padding: 0.5rem;
    --font-size: 1rem;
    --text-color: #000;
    --background-color: ${backgroundColorMap[Theme.LIGHT]};
    --box-background-color: #fff;
    --box-border-color: #aaa;
    --box-text-color: #000;
    --overlay-color-top: rgba(0, 0, 0, 0.25);
    --overlay-color-bottom: rgba(0, 0, 0, 0.75);

    --tabs-border-color: #ccc;
    --tabs-header-bg-color: #f9f9f9;
    --tabs-header-hover-bg-color: #eee;
    --tabs-border-color: #ccc;
    --tabs-active-header-bg-color: #fff;

    --input-background-color: #efefef;
    --input-border-color: #ccc;
    --input-text-color: #000;
    --input-suggestion-background-color: #fff;
    --input-suggestion-text-color: #888;
    --input-suggestion-selected-background-color: #ddd;
    --input-suggestion-selected-text-color: #000;

    --loader-color1: #000;
    --loader-color2: #0002;
  }

  :host([theme='dark']) {
    --negative-color: #600;
    --negative-background-color: #ffc4c4;
    --positive-color: #060;
    --positive-background-color: #c4ffc4;
    --unsynced-color: #666;
    --unsynced-background-color: #c4c4c4;
    --primary-color: #0066ff;
    --border-color: #38635e;
    --border-radius: 0.5rem;
    --padding: 0.5rem;
    --font-size: 1rem;
    --text-color: #cff5f4;
    --background-color: ${backgroundColorMap[Theme.DARK]};
    --box-background-color: #0a1911;
    --box-text-color: #cff5f4;
    --box-border-color: #38635e;
    --overlay-color-top: rgba(0, 0, 0, 0.25);
    --overlay-color-bottom: rgba(0, 0, 0, 0.75);

    --tabs-border-color: #3f6f6a;
    --tabs-header-bg-color: #1a2e2c;
    --tabs-header-hover-bg-color: #4d857e;
    --tabs-active-header-bg-color: #38635e;

    --input-background-color: #0a1911;
    --input-border-color: #38635e;
    --input-text-color: #cff5f4;
    --input-suggestion-background-color: #000;
    --input-suggestion-text-color: #ccc;
    --input-suggestion-selected-background-color: #587;
    --input-suggestion-selected-text-color: #fff;

    --loader-color1: #cff5f4;
    --loader-color2: #cff5f422;
  }

  :host {
    color: var(--text-color);
  }

  input[type='text'],
  input[type='date'],
  input[type='datetime-local'],
  select,
  button {
    font-family: Poppins;
    padding: 0.5rem;
    box-sizing: border-box;
    width: 100%;
  }
  main {
    margin-top: 1rem;
  }

  fieldset {
    border-radius: 0.5rem;
  }

  .box {
    background-color: var(--box-background-color);
    border-radius: 8px;
    border: 1px var(--box-border-color) solid;
  }

  .unsynced {
    color: var(--unsynced-color);
    background-color: var(--unsynced-background-color);
    border: 1px solid var(--unsynced-color);
  }
`;

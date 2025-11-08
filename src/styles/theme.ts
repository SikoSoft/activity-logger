import { css } from 'lit';

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
    --background-color: #ededed;
    --box-background-color: #fff;
    --box-border-color: #aaa;
    --text-color: #000;
    --overlay-color-top: rgba(0, 0, 0, 0.25);
    --overlay-color-bottom: rgba(0, 0, 0, 0.75);

    --tabs-border-color: #ccc;
    --tabs-header-bg-color: #f9f9f9;
    --tabs-header-hover-bg-color: #eee;
    --tabs-border-color: #ccc;
    --tabs-active-header-bg-color: #fff;
  }

  :host([theme='dark']) {
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
    --background-color: #12221a;
    --box-background-color: #0a1911;
    --box-border-color: #38635e;
    --text-color: #cff5f4;
    --overlay-color-top: rgba(0, 0, 0, 0.25);
    --overlay-color-bottom: rgba(0, 0, 0, 0.75);

    --tabs-border-color: #3f6f6a;
    --tabs-header-bg-color: #1a2e2c;
    --tabs-header-hover-bg-color: #4d857e;
    --tabs-active-header-bg-color: #38635e;
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

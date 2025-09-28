import { css } from 'lit';

export const theme = css`
  :host {
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
    --background-color: #fff;
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
    background-color: #fff;
    border-radius: 8px;
    border: 1px #aaa solid;
  }

  .unsynced {
    color: var(--unsynced-color);
    background-color: var(--unsynced-background-color);
    border: 1px solid var(--unsynced-color);
  }
`;

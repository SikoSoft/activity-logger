import { css } from 'lit';

export const theme = css`
  :host {
    --negative-color: #600;
    --positive-color: #060;
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
`;

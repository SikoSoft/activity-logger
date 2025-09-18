import { css } from 'lit';

export const theme = css`
  :host {
    --negative-color: #600;
    --negative-background-color: #ffc4c4;
    --positive-color: #060;
    --positive-background-color: #c4ffc4;
  }

  input[type='text'],
  input[type='date'],
  input[type='datetime-local'],
  input[type='password'],
  input[type='number'],
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

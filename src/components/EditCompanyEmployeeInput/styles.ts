import styled, { css } from 'styled-components';

export const Container = styled.div`
  width: 100%;

  div {
    display: flex;
    width: 100%;
    height: 24px;
    gap: 8px;
    align-items: center;
    justify-content: center;

    input {
      color: black;
      padding-left: 4px;
      font-weight: 500;
      padding: 4px;
      border-radius: 4px;
      color: var(--letter-color-5);
      background: var(--letter-color-3);
    }

    button {
      background: var(--primary-color);
      width: 150px;
      height: 24px;
      font-size: 16px;
      font-weight: 500;
      color: black;
      border: none;
      border-radius: 8px;

      &:hover {
        opacity: 0.8;
      }
    }
    button + button {
      background: var(--red-color);
    }
  }
`;

interface IButtomProps {
  isActive: boolean;
}

export const BooleanButton = styled.button<IButtomProps>`
  width: 100%;
  height: 40px;
  border: none;
  border-radius: 4px;
  background-color: rgba(150, 100, 50, 0.5);
  font-size: 16px;
  color: var(--letter-color-5);
  opacity: 0.8;
  transition: 0.25s;

  &:hover {
    color: var(--letter-color-5);
    box-shadow: var(--window-box-shadow);
    background-color: var(--primary-color);
  }

  ${props =>
    props.isActive &&
    css`
      color: var(--red-color);
      opacity: 1;
      transition: 0.25s;
      background-color: var(--primary-color);
      border-bottom: 1px solid var(--title-color);
      box-shadow: var(--window-box-shadow);

      &:hover {
        color: var(--primary-color);
        background-color: transparent;
        box-shadow: none;
      }
    `}
`;

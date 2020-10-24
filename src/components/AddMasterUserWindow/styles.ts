import styled, { css } from 'styled-components';
import '../../styles/global';

export const Container = styled.div`
  display: grid;
  grid-template-rows: 1fr 1fr 1fr 6fr 1fr;
  align-items: stretch;
  justify-content: stretch;
  width: 100%;
  height: 100%;
  padding: 32px;

  h1 {
    text-align: center;
    width: 100%;
    font-size: 24px;
    color: var(--primary-color);
    margin: 16px auto;
  }

  > input {
    height: 40px;
    width: 100%;
    border-radius: 8px;
    border: none;
    background: var(--card-color);
    color: var(--letter-color-5);
    padding-left: 16px;
  }

  > button {
    width: 100%;
    height: 40px;
    margin-top: 32px;
    border: none;
  }

  > ul {
    width: 100%;
    height: 100%;
    overflow-y: scroll;
    background: rgba(255, 245, 230, 0.5);
    border-radius: 8px;
  }
`;

interface IProps {
  isActive: boolean;
}

export const ToggleRow = styled.li<IProps>`
  display: flex;
  font-size: 16px;
  font-weight: 500;
  text-align: left;
  padding: 16px;
  transition: 0.3s;
  border-bottom: 1px solid var(--letter-color-5);
  color: var(--letter-color-5);

  &:hover {
    opacity: 0.8;
    background: rgba(50, 25, 5, 0.5);
  }

  > button {
    margin-left: auto;
    width: 150px;
    border-radius: 4px;
    transition: 0.3s;
    background: var(--primary-color);
    border: none;
    font-weight: 500;
    font-size: 18px;
    height: 32px;
    box-shadow: var(--box-shadow);

    &:hover {
      border-radius: 8px;
      box-shadow: var(--window-box-shadow);
      background: var(--background-color);
      color: var(--primary-color);
    }
  }

  > span {
    margin-left: auto;

    button {
      background: var(--background-color);
      color: var(--primary-color);
      width: 150px;
      transition: 0.3s;
      border-radius: 4px;
      border: none;
      font-weight: 500;
      font-size: 18px;
      height: 32px;
      box-shadow: var(--box-shadow);

      &:hover {
        background: var(--primary-color);
        color: var(--background-color);
        box-shadow: var(--window-box-shadow-hover);
      }
    }
  }

  ${props =>
    props.isActive &&
    css`
      color: var(--letter-color-5);
      background: rgba(150, 255, 100, 0.2);
      transition: 0.25s;
      box-shadow: var(--window-box-shadow);
    `}
`;

export const ButtonContainer = styled.div`
  display: grid;
  grid-template-rows: 1fr 1fr;
  gap: 32px;
  align-items: center;
  justify-content: stretch;
  background: transparent;

  > button {
    margin-top: 16px;
    text-align: center;
    border-radius: 4px;
    transition: 0.3s;
    background: var(--primary-color);
    border: none;
    font-weight: 500;
    font-size: 18px;
    height: 32px;
    box-shadow: var(--box-shadow);
    color: var(--letter-color-5);

    &:hover {
      border-radius: 8px;
      box-shadow: var(--window-box-shadow);
      background: var(--background-color);
      color: var(--primary-color);
    }
  }

  a {
    text-decoration: none;
    color: var(--primary-color);
    font-weight: 500;
    font-size: 18px;
    line-height: 28px;
    transition: 0.3s;
    width: 100%;

    &:hover {
      color: var(--background-color);
    }
  }
`;
export const InputContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 8fr 1fr;
  gap: 32px;
  align-items: center;
  justify-content: stretch;
  background: transparent;
  color: black;

  input {
    font-size: 18px;
    height: 40px;
    padding: 2px 4px;
    color: black;
  }
`;

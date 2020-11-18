import styled, { css } from 'styled-components';

export const Container = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  gap: 32px;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin: 0;
  padding: 0;

  h2 {
    height: 42px;
    font-size: 32px;
  }
`;

export const ModulesContainer = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  gap: 32px;
  align-items: center;
  justify-content: center;
  margin: 0;
  padding: 0;
  h2 {
    height: 42px;
    font-size: 32px;
  }
  span {
  }
`;

export const FirstRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 4fr;
  width: 100%;
  align-items: center;
  gap: 40px;

  img {
    height: 120px;
    border-radius: 50%;
  }

  div {
    display: flex;
    flex-direction: column;
    align-items: left;
    justify-content: center;
    gap: 16px;

    span {
      width: 100%;
      display: grid;
      grid-template-columns: 1fr 2fr;
      align-items: left;
      justify-content: center;
      gap: 32px;

      strong {
        width: 100%;
        font-size: 20px;
        color: var(--primary-color);
      }
      p {
        width: 100%;
        font-size: 16px;
        color: var(--letter-color-4);
      }
      span {
        width: 100%;
        margin-right: 16px;
        p {
          width: 100%;
          font-size: 16px;
          color: var(--letter-color-4);
        }
      }
    }
  }
`;

export const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 32px;

  button {
    width: 100%;
    height: 40px;
    border: none;
    border-radius: 4px;
  }
`;
export const AddButton = styled.button`
  width: 100%;
  height: 40px;
  border: none;
  border-radius: 4px;
  background: var(--primary-color);
`;

export const SecondRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr;
  width: 100%;
  align-items: center;
  gap: 40px;

  span {
    display: flex;
    flex-direction: column;
    align-items: left;
    justify-content: center;
    gap: 16px;

    h3 {
      width: 100%;
      font-size: 20px;
      color: var(--primary-color);
    }

    div {
      width: 100%;
      p {
        width: 100%;
        font-size: 16px;
        margin-bottom: 16px;
        color: var(--letter-color-4);
      }
      div {
        display: flex;

        p {
          width: 100%;
          font-size: 16px;
          margin-bottom: 16px;
          color: var(--letter-color-4);
        }
        button {
          width: 100%;
          font-size: 16px;
          height: 24px;
          border: none;
          border-radius: 4px;
        }
      }
    }
  }
`;

export const WPModule = styled.button`
  display: flex;
  text-align: left;
  gap: 16px;
  width: 100%;
  height: 100%;

  strong {
    width: 150px;
    font-size: 16px;
    margin-bottom: 16px;
    color: var(--letter-color-4);
  }

  div {
    display: grid;
    grid-template-columns: 1fr 3fr;
    align-items: center;
    justify-content: center;
    gap: 16px;
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

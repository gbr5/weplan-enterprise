import styled, { css } from 'styled-components';

export const Container = styled.div`
  width: 100%;
  height: 100%;

  display: grid;
  grid-template-rows: 1fr 5fr 1fr;
  align-items: center;
  justify-content: center;

  gap: 32px;
  margin: 0;
  padding: 0;

  h2 {
    height: 42px;
    font-size: 32px;
  }
`;

export const FieldHeader = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr 1fr;
  align-items: center;
  justify-content: center;

  padding: 10px;
  gap: 16px;

  strong {
    font-size: 24px;
    font-size: 24px;
  }
`;
export const AddButton = styled.button`
  width: 100%;
  height: 40px;
  border: none;
  border-radius: 4px;
  background: var(--primary-color);
`;

export const DeleteButton = styled.button`
  background: transparent;
  border: none;
  color: var(--red-color);
  transition: 0.3s;

  &:hover {
    color: var(--title-color);
  }
`;

export const SecondRow = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: stretch;
  width: 100%;
  height: 100%;
  align-items: center;
  gap: 5px;
  overflow-y: scroll;
  background: var(--card-color);

  border-radius: 5px;
  padding: 5px;

  span {
    width: 100%;
    display: flex;
    align-items: stretch;
    justify-content: left;
    gap: 16px;
    padding: 5px;
  }
`;

interface IButtomProps {
  isActive: boolean;
}

export const BooleanButton = styled.button<IButtomProps>`
  display: grid;
  grid-template-columns: 3fr 1fr 1fr;
  align-items: center;
  justify-content: center;
  gap: 16px;
  padding: 5px;

  width: 100%;
  height: 40px;
  border: none;
  border-radius: 4px;
  background: var(--background-color);
  font-size: 16px;
  color: var(--letter-color-4);
  opacity: 0.8;
  transition: 0.25s;

  strong {
    text-align: left;
  }

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

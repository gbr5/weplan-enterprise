import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  color: var(--letter-color-5);
  padding: 40px;

  display: flex;
  flex-direction: column;
  gap: 32px;
`;

export const Payments = styled.div`
  width: 100%;

  display: grid;
  grid-template-rows: repeat(4, 1fr);
  align-items: center;
  justify-content: stretch;

  &:nth-child(2) {
    border-top: 1px solid var(--primary-color);
  }

  div {
    width: 100%;

    display: flex;
    h3 {
      width: 100%;
      text-align: center;
    }
    p {
      width: 100%;
      text-align: center;
    }
  }

  div + div {
    border-top: 1px solid var(--background-color);
    padding: 5px;
  }
`;

export const Products = styled.div`
  width: 100%;
  height: 200px;

  display: flex;
  gap: 16px;

  div {
    width: 100%;

    display: flex;
    flex-direction: column;
    gap: 16px;

    button {
      width: 100%;
      height: 40px;

      background: var(--primary-color);
      border: 1px solid var(--title-color);
      font-size: 24px;
    }

    h3 {
      width: 100%;
      height: 40px;
      text-align: center;
      line-height: 24px;
    }

    span {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      padding: auto;
      background: var(--background-color);
      border-radius: 5px;

      h3 {
        color: var(--primary-color);

        strong {
          color: var(--title-color);
        }
      }
    }
  }
`;

export const HiringButton = styled.button`
  width: 100%;
  height: 40px;
  font-weight: 500;
  color: var(--background-color);
  background: none;
  border: none;
`;

export const ButtonContainer = styled.div`
  width: 100%;

  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
  padding: 16px;

  button {
    width: 100%;
    height: 40px;
    font-weight: 500;
    color: var(--background-color);
    border: none;
  }
`;

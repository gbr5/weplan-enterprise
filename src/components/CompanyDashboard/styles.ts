import { shade } from 'polished';
import styled from 'styled-components';

export const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr 4fr;
  height: 100%;
  width: 100%;
`;

export const SideMenu = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  gap: 48px;
  height: 100%;
  width: 100%;
  background: var(--background-color);

  button {
    padding-left: 16px;
    background: transparent;
    border: none;
    font-size: 20px;
    font-weight: 500;
    text-align: left;
    color: var(--letter-color-3);
  }
`;

export const WorkStation = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 800px;
  width: 100%;
  background: var(--letter-color-3);
  padding: 16px 0;

  div {
    width: 100%;
    margin: 8px 0 0;
  }
`;

export const Payments = styled.div`
  width: 100%;

  display: grid;
  grid-template-rows: repeat(4, 1fr);
  align-items: center;
  justify-content: stretch;

  &:nth-child(3) {
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

export const Section = styled.div`
  height: 100%;
  width: 100%;
  color: var(--letter-color-5);
  padding: 40px;

  span {
    position: absolute;
    top: 64px;
    right: 56px;
    z-index: 10;

    button {
      background: var(--background-color);
      border: none;
      border-radius: 16px;
      padding: 2px 6px 0;
      box-shadow: var(--window-box-shadow);
      border: 2px solid transparent;
      transition: 0.4s;

      svg {
        color: var(--primary-color);
        transition: 0.4s;
        &:hover {
          color: var(--title-color);
        }
      }
      &:hover {
        border: 2px solid var(--title-color);
      }
    }
  }
`;

export const FinacialSection = styled.div`
  width: 100%;
  color: var(--letter-color-5);
  padding: 40px;
`;

export const HiringButton = styled.button`
  width: 100%;
  height: 40px;
  font-weight: 500;
  color: var(--background-color);
  background: none;
  border: none;

  h1 {
    margin-bottom: auto;
  }
`;
export const EmployeeSection = styled.div`
  display: grid;
  grid-template-rows: 5fr 3fr;
  height: 90%;
  width: 100%;
  color: var(--letter-color-5);
  padding-bottom: 32px;
  gap: 40px;
`;

export const ConfirmedEmployeeSection = styled.div`
  height: 100%;
  width: 100%;
  color: var(--letter-color-5);
  padding: 16px 16px 8px;

  span {
    position: absolute;
    top: 64px;
    right: 56px;
    z-index: 10;

    button {
      background: var(--background-color);
      border: none;
      border-radius: 50%;
      padding: 3px 5px 0;
      box-shadow: var(--window-box-shadow);
      transition: 0.4s;

      svg {
        color: var(--primary-color);
        transition: 0.4s;
        &:hover {
          color: var(--background-color);
        }
      }
      &:hover {
        background: var(--title-color);

        svg {
          color: var(--background-color);
        }
      }
    }
  }
`;

export const UnConfirmedEmployeeSection = styled.div`
  height: 100%;
  width: 100%;
  color: var(--letter-color-5);
  padding: 8px 16px 20px;

  span {
    position: absolute;
    top: 64px;
    right: 56px;
    z-index: 10;

    button {
      background: var(--background-color);
      border: none;
      border-radius: 16px;
      padding: 2px 6px 0;
      box-shadow: var(--window-box-shadow);
      border: 2px solid transparent;
      transition: 0.4s;

      svg {
        color: var(--primary-color);
        transition: 0.4s;
        &:hover {
          color: var(--title-color);
        }
      }
      &:hover {
        border: 2px solid var(--title-color);
      }
    }
  }
`;

export const CompanyInfoList = styled.div`
  height: 100%;
  width: 100%;

  display: flex;
  flex-direction: column;
  gap: 16px;
  align-items: center;
  justify-content: center;
`;

export const EmployeeScrollList = styled.div`
  overflow-y: scroll;
  background: var(--background-color);
  border-radius: 4px;

  span {
    position: absolute;
    top: 0;
    right: 16px;
    z-index: 10;

    button {
      background: var(--background-color);
      border: none;
      border-radius: 16px;
      color: var(--primary-color);
      padding: 2px 6px 0;
      box-shadow: var(--window-box-shadow);
      border: 1px solid transparent;

      &:hover {
        border: 1px solid var(--title-color);

        svg {
          color: var(--title-color);
        }
      }
    }
  }

  table {
    width: 100%;
    padding: 8px 16px 8px;

    tr {
      border-bottom: 1px solid var(--title-color);
    }
    tr {
      color: var(--primary-color);
      padding: 0;
      height: 40px;
      border-bottom: 1px solid var(--letter-color-3);

      th {
        height: 40px;
        border-bottom: 1px solid var(--letter-color-3);
      }
      span {
        width: 8px;
        position: static;
        button {
          background: transparent;
          border: none;
          color: var(--primary-color);
        }
      }

      td:first-child {
        text-align: center;
        color: var(--title-color);
        width: 48px;
        border-bottom: 1px solid var(--letter-color-2);
      }

      td:nth-child(2),
      td:nth-child(3) {
        font-weight: 500;
        color: var(--letter-color-1);
      }
      td:nth-child(3) {
        width: 160px;
      }

      td:last-child {
        width: 80px;
        padding-left: 0;
        button {
          width: 100%;
          display: flex;
          justify-content: center;
          background: transparent;
          border: none;
          color: var(--primary-color);
        }
      }

      /* &:last-child {
        td {
          border: none;
        }
      } */

      td + td {
        border-bottom: 1px solid var(--letter-color-2);
        padding-left: 16px;
      }
    }
  }
`;

export const FirstRow = styled.div`
  display: grid;
  grid-template-columns: 3fr 1fr;
  align-items: center;
  gap: 16px;
  width: 100%;
  height: 100%;

  table {
    border-radius: 8px;
    background: var(--background-color);
    width: 100%;
    padding: 8px 16px 8px;
    height: 280px;

    tr {
      color: var(--letter-color-2);
      padding: 0;

      td {
        border-bottom: 1px solid var(--letter-color-3);
        padding-left: 8px;
      }
      td:first-child {
        color: var(--title-color);
        width: 200px;
        border-bottom: 1px solid var(--letter-color-2);
      }
      td:last-child {
        width: 48px;
        padding-left: 0;
        button {
          width: 100%;
          display: flex;
          justify-content: center;
          background: transparent;
          border: none;
          color: var(--primary-color);
        }
      }

      &:last-child {
        td {
          border: none;
        }
      }
    }
  }
`;

export const SecondRow = styled.div`
  display: grid;
  grid-template-columns: 3fr 1fr;
  align-items: center;
  gap: 16px;
  width: 100%;

  div {
    height: 100%;

    h2 {
      margin-bottom: 16px;
    }

    span {
      position: unset;
      display: flex;
      width: 100%;
      align-items: center;
      justify-content: stretch;

      button {
        position: unset;
        margin-left: auto;
      }
    }
  }

  table {
    border-radius: 8px;
    background: var(--background-color);
    width: 100%;
    height: 160px;
    padding: 8px 16px 8px;
    overflow-y: scroll;

    tr {
      color: var(--letter-color-2);
      padding: 0;

      td {
        border-bottom: 1px solid var(--letter-color-3);
        padding-left: 8px;
      }
      td:first-child {
        color: var(--title-color);
        width: 200px;
        border-bottom: 1px solid var(--letter-color-2);
      }
      td:last-child {
        width: 48px;
        padding-left: 0;
        button {
          width: 100%;
          display: flex;
          justify-content: center;
          background: transparent;
          border: none;
          color: var(--primary-color);
        }
      }

      &:last-child {
        td {
          border: none;
        }
      }
    }
  }
`;

export const ImageContainer = styled.div`
  display: grid;
  grid-template-rows: 1fr 1fr;
  gap: 16px;
  border-radius: 8px;
  padding: 16px;
  height: 100%;
  background: var(--background-color);
`;

export const AvatarInput = styled.label`
  cursor: pointer;
  background: transparent;
  border: 1px solid var(--card-color);
  border-radius: 8px;
  transition: 0.3s;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;

  h2 {
    top: 4px;
    left: 4px;
    position: absolute;
    font-size: 16px;
    color: var(--letter-color-2);
  }

  img {
    height: 56px;
    width: 56px;
  }

  &:hover {
    border: 1px solid var(--title-color);
    box-shadow: var(--window-box-shadow);
    background: var(--letter-color-2);

    h2 {
      color: var(--letter-color-5);
    }
  }

  div {
    width: 40px;
    height: 40px;
    background: var(--primary-color);
    border-radius: 50%;
    border: none;
    transition: background-color 0.4s;
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    bottom: 0;
    right: 0;

    input {
      display: none;
    }

    svg {
      width: 24px;
      height: 24px;
      color: var(--letter-color-5);
    }

    &:hover {
      background-color: ${shade(0.3, '#ff9000')};
    }
  }
`;

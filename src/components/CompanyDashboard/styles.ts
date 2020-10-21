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
  height: 668px;
  width: 100%;
  background: var(--letter-color-3);
  padding: 16px 0;

  div {
    width: 100%;
    height: 100%;
    margin: 8px 0 0;
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

export const EmployeesList = styled.div`
  height: 100%;
  width: 100%;
  position: relative;

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
    border-radius: 8px;
    background: var(--background-color);
    width: 100%;
    height: 100%;
    padding: 8px 16px 8px;

    tr {
      color: var(--letter-color-2);
      padding: 0;

      th {
        height: 40px;
        border-bottom: 1px solid var(--letter-color-3);
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

export const EmployeeScrollList = styled.tr`
  overflow-y: scroll;

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

  &:last-child {
    td {
      border: none;
    }
  }

  td + td {
    border-bottom: 1px solid var(--letter-color-2);
    padding-left: 16px;
  }
`;

export const FirstRow = styled.div`
  display: grid;
  grid-template-columns: 3fr 1fr;
  align-items: center;
  gap: 16px;
  width: 100%;

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

  table:nth-child(2) {
    display: grid;
    grid-template-rows: 1fr 1fr;
    gap: 16px;
    padding: 16px;

    button {
      padding-top: 4px;
      background: transparent;
      border: 1px solid var(--card-color);
      border-radius: 8px;
      transition: 0.3s;

      img {
        height: 80px;
      }

      &:hover {
        border: 1px solid var(--title-color);
        box-shadow: var(--window-box-shadow);
        background: var(--letter-color-2);
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
  height: 100%;

  div {
    h2 {
      margin-bottom: 16px;
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

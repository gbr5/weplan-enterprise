import styled from 'styled-components';
import '../../styles/global';

export const Header = styled.header`
  position: fixed;
  top: 0;
  z-index: 8;

  width: 100%;

  background: transparent;
`;

export const HeaderContent = styled.div`
  width: 100%;
  margin: 0 auto;
  display: flex;
  align-items: center;
  padding-right: 24px;

  > img {
    height: 56px;
  }

  > h2 {
    margin-left: auto;
    font-size: 20px;
    color: var(--letter-color-5);
    display: flex;
    align-items: center;
    justify-content: center;
    transition: 0.3s;
    border-bottom: 1px solid var(--title-color);
    padding: 0 16px 4px;

    &:hover {
      opacity: 0.8;

      > button {
        > svg {
          color: var(--title-color);
        }
      }
    }

    > button {
      background: transparent;
      border: none;
      color: var(--letter-color-1);
      > svg {
        transition: 0.3s;
      }
    }
  }

  > button {
    display: flex;
    align-items: baseline;
    justify-content: center;
    gap: 8px;
    background: transparent;
    border: none;
    margin-left: 8px;

    > img {
      height: 20px;
    }

    > h1 {
      font-size: 20px;
      color: var(--title-color);
    }
  }
`;

export const Menu = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: auto;

  button {
    background: transparent;
    border: 0;
    margin-left: 32px;
    font-size: 18px;
    font-weight: 500;
    color: var(--letter-color-1);
    width: 32px;
    height: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: 0.3s;
    /* border: 1px solid var(--primary-color); */
    box-shadow: var(--box-shadow);
    border-radius: 50%;

    svg {
      color: var(--red-color);
      width: 24px;
      height: 24px;
      transition: 0.3s;
    }

    &:hover {
      border: 1px solid var(--title-color);
      border-radius: 4px;
      box-shadow: var(--window-box-shadow);
    }

    &:nth-child(4) {
      svg {
        color: var(--red-color);
        transition: 0.3s;
      }

      &:hover {
        border: 1px solid var(--red-color);
        border-radius: 4px;
        box-shadow: var(--window-box-shadow);

        svg {
          color: var(--title-color);
        }
      }
    }
  }
`;

export const ToggleButton = styled.div`
  display: flex;
  gap: 16px;
  align-items: center;
  justify-content: center;
`;

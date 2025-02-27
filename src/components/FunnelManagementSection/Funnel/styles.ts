import styled, { css, keyframes } from 'styled-components';
import '../../../styles/global';

const appearFromTop = keyframes`
  0% {
    opacity: 0;
    transform: translateY(-50px);
  }

  100% {
    opacity: 1;
    transform: translateY(0px);
  }
`;

interface IActivePropsDTO {
  isActive: boolean;
}

export const Container = styled.span<IActivePropsDTO>`
  display: flex;
  width: 100%;
  height: 80px;
  align-items: center;
  justify-content: stretch;
  gap: 32px;
  padding: 16px;
  border-radius: 4px;
  color: var(--letter-color-3);

  transition: 0.5s;
  border: 1px solid transparent;
  animation: ${appearFromTop} 0.5s;
  /*
  border-bottom: 2px solid var(--title-color);
  border-left: 2px solid var(--title-color); */

  background: var(--background-color);

  &:hover {
    border: 1px solid var(--primary-color);
    color: var(--title-color);
    box-shadow: var(--window-box-shadow);

    svg {
      color: var(--primary-color);
    }
  }

  > strong {
    color: var(--letter-color-4);
    font-size: 20px;
    line-height: 26px;
    transition: 0.3s;
    display: block;
  }
  > span {
    width: 100%;
    > button {
      height: 40px;
      margin-left: auto;
      background: transparent;
      border: 1px solid transparent;
      padding: 5px;
      color: var(--title-color);
      border-radius: 5px;
      width: 100%;
      border: 1px solid var(--title-color);
      box-shadow: var(--window-box-shadow);

      display: flex;
      align-items: center;
      justify-content: center;
      transition: 0.3s;

      svg {
        margin-left: auto;
        color: var(--letter-color-4);
      }

      &:hover {
        border: 1px solid var(--title-color);
        background: var(--primary-color);
        color: black;
        svg {
          color: black;
        }
      }
    }
  }

  ${props =>
    props.isActive &&
    css`
      border: none;
      border-bottom: 2px solid var(--title-color);
      border-left: 1px solid var(--title-color);
      transition: 0.25s;

      > strong {
        color: var(--primary-color);
      }

      &:hover {
        opacity: 0.8;

        > strong {
          color: var(--title-color);
        }
      }
    `}
`;

interface IStageActivePropsDTO {
  isActive: boolean;
}

export const StageFunnel = styled.span<IStageActivePropsDTO>`
  display: flex;

  align-items: center;
  justify-content: stretch;
  gap: 5px;
  padding: 8px;
  width: 100%;
  height: 24px;
  border-radius: 4px;
  color: var(--letter-color-3);

  transition: 0.3s;
  background: var(--background-color);

  &:hover {
    color: var(--title-color);

    h3 {
      color: var(--primary-color);
    }
    svg {
      color: var(--primary-color);
    }
  }

  > p {
    color: var(--primary-color);
    font-size: 12px;
    line-height: 26px;
    transition: 0.3s;
    display: block;
  }

  > h3 {
    color: var(--letter-color-4);
    font-size: 12px;
    line-height: 26px;
    transition: 0.3s;
    display: block;
  }

  > button {
    margin-left: auto;
    background: transparent;
    border: none;
    font-size: 10px;
    line-height: 26px;

    &:hover {
      svg {
        color: var(--title-color);
      }
    }

    svg {
      color: var(--letter-color-4);
    }
  }

  ${props =>
    props.isActive &&
    css`
      border: none;
      border-bottom: 2px solid var(--title-color);
      border-left: 1px solid var(--title-color);
      transition: 0.25s;

      > h3 {
        color: var(--primary-color);
      }

      &:hover {
        opacity: 0.8;

        > h3 {
          color: var(--title-color);
        }
      }
    `}
`;

export const StageSection = styled.span`
  display: flex;
  align-items: center;
  justify-content: stretch;
  gap: 5px;
  padding: 5px;
  width: 100%;
  background: var(--card-color);
  font-size: 16px;
`;

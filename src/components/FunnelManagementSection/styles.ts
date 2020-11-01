import styled, { css, keyframes } from 'styled-components';
import '../../styles/global';

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

export const Container = styled.div`
  display: flex;
  flex-direction: column;

  align-items: center;
  justify-content: center;

  gap: 16px;
  width: 100%;
  padding: 40px;

  background: var(--letter-color-3);
`;

interface IStageActivePropsDTO {
  isActive: boolean;
}

export const StageFunnel = styled.span<IStageActivePropsDTO>`
  display: flex;

  align-items: center;
  justify-content: stretch;
  gap: 32px;
  padding: 32px 8px;
  width: 100%;
  height: 24px;
  border-radius: 4px;
  color: var(--letter-color-3);

  transition: 0.3s;
  background: var(--background-color);

  &:hover {
    border: 1px solid var(--primary-color);
    border-left: 2px solid var(--title-color);
    border-right: 1px solid var(--red-color);
    color: var(--title-color);

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

  > button {
    margin-left: auto;
    background: transparent;
    border: none;

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

interface IActivePropsDTO {
  isActive: boolean;
}

export const Funnel = styled.span<IActivePropsDTO>`
  display: flex;
  width: 100%;
  height: 80px;
  align-items: center;
  justify-content: stretch;
  gap: 32px;
  padding: 16px;
  border-radius: 4px;
  color: var(--letter-color-3);

  transition: 0.3s;
  animation: ${appearFromTop} 0.5s;
  /*
  border-bottom: 2px solid var(--title-color);
  border-left: 2px solid var(--title-color); */

  background: var(--background-color);

  &:hover {
    border: 1px solid var(--primary-color);
    border-left: 2px solid var(--title-color);
    border-right: 1px solid var(--red-color);
    color: var(--title-color);

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

  > button {
    margin-left: auto;
    background: transparent;
    border: none;

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

export const StageSection = styled.span`
  display: flex;
  align-items: center;
  justify-content: stretch;
  gap: 8px;
  padding: 8px;
  width: 100%;
  background: var(--card-color);
`;

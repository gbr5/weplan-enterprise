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

export const UpperPage = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 80px;
  gap: 16px;

  div {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 40px;
    gap: 16px;
    width: 100%;
  }
`;

interface IActivePropsDTO {
  isActive: boolean;
}

export const ModuleTitle = styled.div<IActivePropsDTO>`
  transition: 0.3s;
  height: 32px;
  animation: ${appearFromTop} 0.5s;

  &:hover {
    border-bottom: 1px solid var(--primary-color);

    > strong {
      color: var(--letter-color-2);
    }
  }

  > strong {
    color: var(--letter-color-4);
    font-size: 20px;
    line-height: 26px;
    transition: 0.3s;
    display: block;
  }

  ${props =>
    props.isActive &&
    css`
      border: none;
      border-bottom: 1px solid var(--title-color);
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

import styled, { keyframes } from 'styled-components';
import '../../styles/global';

import signUpBackgroundImg from '../../assets/sign-up-background.jpeg';

export const Container = styled.div`
  height: 100%;
  width: 100%;
  padding: 48px 40px 0;
  @media (max-width: 800px) {
    padding: 40px 0 0 24px;
  }
`;

export const Content = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  background: transparent;

  place-content: center;

  width: 100%;

  @media (max-width: 800px) {
    display: flex;
  }
`;

const appearFromLeft = keyframes`
  from {
    opacity: 0;
    transform: translateX(-400px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

export const ToggleButton = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  top: 8px;
  left: 8px;
  gap: 16px;

  h3 {
    font-size: 20px;
    font-weight: 500px;
    color: var(--title-color);
  }

  a {
    background: transparent;
    border: none;
    text-decoration: none;

    h2 {
      font-size: 20px;
      font-weight: 500px;
      color: var(--letter-color-3);
      transition: 0.5s;

      &:hover {
        color: var(--primary-color);
      }
    }
  }
`;

export const AnimationContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  width: 100%;
  place-content: center;
  gap: 16px;

  a {
    color: var(--letter-color-3);
    font-size: 20px;
    padding: auto 0;
    text-decoration: none;
    transition: 0.3s;
    text-align: center;

    p {
      border-bottom: 1px solid var(--primary-color);
    }

    h6 {
      color: var(--title-color);
      line-height: 40px;
      transition: 0.3s;
      font-size: 24px;
      strong {
        color: green;
        font-weight: 500;
        transition: 0.5s;
      }
    }

    &:hover {
      color: var(--title-color);

      p {
        color: var(--primary-color);
      }
      h6 {
        color: green;
        strong {
          color: var(--title-color);
          font-weight: 500;
          transition: 0.3s;
          font-size: 28px;
        }
      }
    }
  }
  a + a {
    font-size: 16px;
    h6 {
      color: var(--title-color);
      transition: 0.3s;
      font-size: 18px;
      strong {
        color: var(--primary-color);
        font-weight: 500;
        transition: 0.3s;
        font-size: 20px;
      }
    }
    &:hover {
      h6 {
        color: var(--primary-color);
        strong {
          color: var(--title-color);
          font-weight: 500;
          transition: 0.3s;
          font-size: 22px;
        }
      }
    }
  }

  div {
    display: flex;
    justify-content: center;
    gap: 24px;
    width: 100%;

    h1 {
      color: var(--title-color);
      font-size: 32px;
      padding: auto 0;
    }
    h2 {
      color: var(--letter-color-3);
      font-size: 20px;
      padding: auto 0;
    }
    h3 {
      padding: 2px 0;
      color: var(--letter-color-4);
      font-size: 28px;
    }
  }
  div:nth-child(3) {
    h2 {
      color: var(--letter-color-2);
    }
  }

  h1 {
    color: var(--primary-color);
    font-size: 40px;

    strong {
      font-size: 40px;
      color: var(--title-color);
    }
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 8px;
    width: 100%;
    text-align: center;
    animation: ${appearFromLeft} 0.8s;

    input {
      width: 340px;
    }

    h1 {
      margin-bottom: 24px;
    }
  }

  div {
    display: flex;
    justify-content: center;
    gap: 24px;
    width: 100%;

    a {
      color: var(--primary-color);
      display: block;
      text-decoration: none;
      transition: 0.3s;
      font-size: 24px;
      font-weight: 500;
      margin-top: 24px;

      display: flex;
      align-items: center;

      p {
        color: var(--letter-color-4);
        transition: 0.3s;
        &:hover {
          color: var(--title-color);
        }
      }

      svg {
        margin-right: 16px;
      }

      &:hover {
        color: var(--title-color);
      }
    }
  }
  @media (max-width: 800px) {
    width: 90%;
    margin-bottom: 24px;

    h1 {
      color: var(--primary-color);
      font-size: 40px;
      font-weight: bold;
      padding: 16px 16px;
      background: var(--background-color);
      border-radius: 8px;
      width: 60%;
      text-align: center;
    }

    div {
      &:first-child {
        display: none;
        /* text-align: center;
        width: 60%;
        margin: 0 auto;
        display: flex;
        align-items: center;
        justify-content: center;
        background: var(--header-background-color);
        border-radius: 8px;
      }
      h1,
      h3 {
        padding: 0;
        font-size: 24px;
        font-weight: bold;
        color: var(--title-color);
        background: var(--header-background-color);
      }
      h1 {
        padding-top: 24px; */
      }
      h2 {
        display: none;
      }
    }
  }
`;

export const Background = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  margin: auto;
  z-index: -1;
  flex: 1;
  background: url(${signUpBackgroundImg}) no-repeat center;
  background-size: cover;
`;

export const QuestionTitle = styled.h2`
  color: var(--title-color);
  font-size: 32px;
  margin: 32px auto;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 16px;

  > strong {
    font-size: 40px;
    color: var(--primary-color);
  }
`;

import Form from '../components/Form';
import { styled } from 'styled-components';

export default function Write() {
  return (
    <WriteContainer>
      <Form />
    </WriteContainer>
  );
}

const WriteContainer = styled.main`
  display: flex;
  justify-content: center;
  color: var(--color-black);

  & > section {
    border: 2px solid var(--color-black);
    width: 60rem;
    padding: 2rem;
    margin-top: 2rem;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    background: var(--color-white);
    font-size: var(--font-size-m);

    select {
      width: 15rem;
    }

    > section {
      display: flex;
      flex-direction: column;
      width: 40rem;
      & > div {
        display: flex;

        :first-child {
          margin-right: 2rem;
        }

        > select {
          width: 15rem;
        }
      }
    }

    :nth-child(7) {
      min-height: 10rem;
    }

    & input,
    select,
    textarea {
      border: 1px solid var(--color-black);
      padding: 0.5rem;
      border-radius: 5px;
      margin: 1rem 0 2rem 0;
      font-family: 'BR-Regular';
      font-size: var(--font-size-s);
      color: var(--color-black);
    }

    & textarea {
      resize: vertical;
    }

    > :nth-child(2) {
      width: 40rem;
    }

    :nth-child(10) {
      display: flex;
      min-height: 3rem;

      > div {
        margin: 0 0.5rem 1rem 0;
        font-size: var(--font-size-s);
        padding: 0.5rem;
        border-radius: 5px;
        background: var(--color-gray);

        > span {
          cursor: pointer;
        }
      }
    }

    > :last-child {
      display: flex;
      justify-content: center;

      & button {
        border: 2px solid var(--color-black);
        padding: 0.5rem;
        border-radius: 5px;
        margin: 1rem 0 1rem 0;
        font-family: 'BR-Regular';
        font-size: var(--font-size-s);
        background: var(--color-pink-1);
        color: var(--color-black);
        width: 10rem;
        cursor: pointer;

        &:hover {
          background: var(--color-pink-2);
        }

        &:active {
          background: var(--color-pink-3);
        }
      }
    }
  }
`;

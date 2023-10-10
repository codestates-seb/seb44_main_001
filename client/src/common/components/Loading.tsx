import { styled } from 'styled-components';

import roundingMomo from '../../common/assets/images/roundingMomo.svg';

export default function Loading() {
  return (
    <Wrapper>
      <img src={roundingMomo} alt="loading" />
      <div className="message">Loading...</div>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 3rem;

  @keyframes rotateAnimation {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }

  > img {
    animation: rotateAnimation 2s linear infinite;
  }

  .message {
    margin-top: 1rem;
    font-size: var(--font-size-l);
  }
`;

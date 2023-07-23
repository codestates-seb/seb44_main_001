import { useState, useEffect } from 'react';
import { styled } from 'styled-components';
import goTopMomo from '../assets/icons/goTopMomo.svg';
import useScrollToToop from '../util/customHook/useScrollToTop';

export default function TopButton() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  const handleClickTop = () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useScrollToToop();
  };

  return (
    <>
      {isVisible && (
        <TopBtn onClick={handleClickTop}>
          <img src={goTopMomo} alt="top-button" />
          <div>TOP</div>
        </TopBtn>
      )}
    </>
  );
}
const TopBtn = styled.button`
  background-color: transparent;
  border: none;
  position: fixed;
  bottom: 20%;
  right: 80px;
  font-size: var(--font-size-m);
  border-radius: 50px;
  animation: bounce_frames 0.5s infinite;
  animation-direction: alternate;
  animation-timing-function: cubic-bezier(0.5, 0.05, 1, 0.5);
  padding: 0.5rem;
  background-color: #ffcad072;
  @keyframes bounce_frames {
    from {
      transform: translate3d(0, 0, 0);
    }
    to {
      transform: translate3d(0, 10px, 0);
    }
  }
  &:hover {
    background-color: var(--color-pink-2);
  }
`;

import { useState, useEffect } from 'react';
import { styled } from 'styled-components';
import goTopMomo from '../assets/icons/goTopMomo.svg';

export default function TopButton() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // 스크롤 이벤트를 감지하여 버튼의 표시 여부 결정
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    // 컴포넌트가 언마운트될 때 이벤트 리스너 해제
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  const handleClickTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
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
  animation: bounce_frames 0.5s infinite;
  animation-direction: alternate;
  animation-timing-function: cubic-bezier(0.5, 0.05, 1, 0.5);
  @keyframes bounce_frames {
    from {
      transform: translate3d(0, 0, 0);
    }
    to {
      transform: translate3d(0, 10px, 0);
    }
  }
  & :hover {
    color: var(--color-pink-1);
  }
`;

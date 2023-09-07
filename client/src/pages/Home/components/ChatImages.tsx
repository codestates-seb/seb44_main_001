import { useState, useEffect } from 'react';
import styled from 'styled-components';
import chatList from '../../../common/assets/images/chatList.png';
import chatRoom from '../../../common/assets/images/chatRoom.png';
import chatRoom2 from '../../../common/assets/images/chatRoom2.png';

const images = [chatList, chatRoom, chatRoom2];

type AnimatedImageProps = {
  $isVisible: number;
};

export default function ChatImages() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const shuffleInterval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 2500);

    return () => clearInterval(shuffleInterval);
  }, []);

  return (
    <div style={{ display: 'flex' }}>
      <ImageContainer>
        {images.map((image, index) => (
          <AnimatedImage
            key={index}
            src={image}
            alt={`Chat Image ${index + 1}`}
            $isVisible={currentIndex === index ? 1 : 0}
          />
        ))}
      </ImageContainer>
    </div>
  );
}

const ImageContainer = styled.div`
  position: relative;
  height: 30rem;
  margin-right: 30rem;
`;

const AnimatedImage = styled.img<AnimatedImageProps>`
  position: absolute;
  top: 0;
  left: 0;
  opacity: ${(props) => props.$isVisible};
  transition: opacity 1s ease-in-out;
`;

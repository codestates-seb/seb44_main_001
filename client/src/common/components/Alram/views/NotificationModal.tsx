import { useState } from 'react';
import Modal from 'react-modal';
import { styled } from 'styled-components';
import { BiBell } from 'react-icons/bi';
import { AlramStyle } from '../AlramStyle';
import NotificationMain from '../components/NotificationMain';

export default function NotificationModal() {
  const [isOpen, setIsOpen] = useState(false);

  const handleModalChange = () => {
    setIsOpen(!isOpen);
  };

  return (
    <Wrapper>
      <Button onClick={handleModalChange}>
        <BiBell size={25} />
      </Button>
      <Modal
        isOpen={isOpen}
        style={AlramStyle}
        onRequestClose={handleModalChange}
      >
        <NotificationMain />
      </Modal>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  margin-left: 10px;
  margin-top: 2px;
`;

const Button = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;
`;

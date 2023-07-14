import { useState } from 'react';
import Modal from 'react-modal';
import { styled } from 'styled-components';
import { BiBell } from 'react-icons/bi';
import { AlramStyle } from '../../AlramStyle';

export default function AlramModal() {
  const [isOpen, setIsOpen] = useState(false);

  const handleModalChange = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <Button onClick={handleModalChange}>
        <BiBell size={25} />
      </Button>
      <Modal
        isOpen={isOpen}
        style={AlramStyle}
        onRequestClose={handleModalChange}
      ></Modal>
    </>
  );
}

const Button = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;
`;

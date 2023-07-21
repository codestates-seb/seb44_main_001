import Modal from 'react-modal';
import { createRoomModalStyle } from '../createRoomModalStyle';
import { styled } from 'styled-components';
import { ChangeEvent, useState } from 'react';
import Button from '../../Button';

export default function CreateRoomModal({
  isOpen,
  setCreateRoomModal,
}: {
  isOpen: boolean;
  setCreateRoomModal: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [roomName, setRoomName] = useState('');

  const handleModalClose = () => {
    setCreateRoomModal(false);
  };

  const handleInput = (event: ChangeEvent<HTMLInputElement>) => {
    setRoomName(event.target.value);
  };

  const handleSubmit = () => {
    console.log(roomName);
  };

  return (
    <Modal
      isOpen={isOpen}
      style={createRoomModalStyle}
      onRequestClose={handleModalClose}
      ariaHideApp={false}
    >
      <RoomNameInput
        placeholder="생성할 그룹채팅방의 이름을 입력해주세요!"
        onChange={handleInput}
      />
      <Button onClick={handleSubmit}>그룹채팅방 생성</Button>
    </Modal>
  );
}

const RoomNameInput = styled.input`
  width: 100%;
  margin-bottom: 1rem;
`;

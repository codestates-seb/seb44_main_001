import Modal from 'react-modal';
import { createRoomModalStyle } from '../createRoomModalStyle';
import { styled } from 'styled-components';
import { ChangeEvent, useState, KeyboardEvent } from 'react';
import Button from '../../Button';
import { useMutation } from 'react-query';
import { BASE_URL } from '../../../util/constantValue';
import { NewRoom } from '../../../type';
import { useDispatch } from 'react-redux';
import { setChatRoomInfo } from '../../../store/ChatRoomInfoStore';
import { postData } from '../../../apis';
import useMyInfo from '../../../util/customHook/useMyInfo';

export default function CreateRoomModal({
  isOpen,
  setCreateRoomModal,
}: {
  isOpen: boolean;
  setCreateRoomModal: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [roomName, setRoomName] = useState('');

  const dispatch = useDispatch();

  const { myData } = useMyInfo();

  const memberId = myData?.memberId;

  const data: NewRoom = {
    memberId: memberId,
    roomName: roomName,
    roomType: 'GROUP',
  };

  const postMutation = useMutation(
    'createRoom',
    () => postData(`${BASE_URL}/rooms/register`, data),
    {
      onSuccess: (data) => {
        dispatch(
          setChatRoomInfo({
            roomId: data,
            roomName: roomName,
            roomType: 'GROUP',
          }),
        );
        setRoomName('');
      },
    },
  );

  const handleModalClose = () => {
    setCreateRoomModal(false);
  };

  const handleInput = (event: ChangeEvent<HTMLInputElement>) => {
    setRoomName(event.target.value);
  };

  const handleSubmit = () => {
    if (roomName.length > 0) {
      postMutation.mutate();
    } else {
      alert('채팅방 이름을 입력해주세요!');
    }
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && roomName.length > 0) {
      event.preventDefault();
      handleSubmit();
    }
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
        onKeyDown={handleKeyDown}
        maxLength={15}
        autoFocus
      />
      <Button onClick={handleSubmit}>그룹채팅방 생성</Button>
    </Modal>
  );
}

const RoomNameInput = styled.input`
  width: 100%;
  margin-bottom: 1rem;
`;

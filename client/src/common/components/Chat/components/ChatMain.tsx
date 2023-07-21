import { styled } from 'styled-components';
import { MdOutlineClose } from 'react-icons/md';
import { AiFillDelete } from 'react-icons/ai';
import { useDispatch } from 'react-redux';
import { setChatRoomInfo } from '../../../store/ChatRoomInfoStore';
import { ChatRoomData, Room } from '../../../type';
import { BASE_URL } from '../../../util/constantValue';
import { calculateTimeDifference } from '../../../util/timeDifferenceCalculator';
import { UseQueryResult, useMutation } from 'react-query';
import deleteRoom from '../api/deleteRoom';
import { useState } from 'react';
import { BsFillPlusCircleFill } from 'react-icons/bs';
import CreateRoomModal from './CreateRoomModal';

export default function ChatMain({
  handleModalClose,
  prevRoom,
  getRoomQuery,
  setIsDataDifferent,
}: {
  handleModalClose: () => void;
  prevRoom: Room[];
  getRoomQuery: UseQueryResult<ChatRoomData, unknown>;
  setIsDataDifferent: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const dispatch = useDispatch();

  const [roomToDelete, setRoomToDelete] = useState(0);

  const [createRoomModal, setCreateRoomModal] = useState(false);

  const deleteMutation = useMutation(
    'deleteRoom',
    () => deleteRoom(`${BASE_URL}/rooms/${roomToDelete}`),
    {
      onSuccess: () => {
        getRoomQuery.refetch();
      },
    },
  );

  const handleChatRoomClick = (room: Room) => {
    dispatch(setChatRoomInfo({ roomName: room.roomName, roomId: room.roomId }));
  };

  const handleMouseOver = (roomId: number) => {
    setRoomToDelete(roomId);
  };

  const handleDelete = (event: MouseEvent) => {
    event.stopPropagation();
    deleteMutation.mutate();
    setIsDataDifferent(false);
  };

  const handleCreateRoom = () => {
    setCreateRoomModal(true);
  };

  return (
    <Container>
      <ChatHeader>
        <div>
          <h1>채팅방</h1>
          <BsFillPlusCircleFill size={24} onClick={handleCreateRoom} />
        </div>
        <MdOutlineClose size={32} onClick={handleModalClose} />
      </ChatHeader>
      <ChatList>
        <Chat>
          {prevRoom.map((room, idx) => (
            <div key={idx} onClick={() => handleChatRoomClick(room)}>
              <div>
                <div>
                  <div>{room.roomName}</div>
                  {room.unreadCount !== 0 && <div>{room.unreadCount}</div>}
                </div>
                <div>{calculateTimeDifference(room.lastSentTime)}</div>
              </div>
              <div>
                <div>
                  {prevRoom && room?.lastMessage.length > 20
                    ? `${room.lastMessage.slice(0, 20)}...`
                    : room.lastMessage}
                </div>
                <AiFillDelete
                  size={16}
                  onClick={handleDelete}
                  onMouseOver={() => handleMouseOver(room.roomId)}
                />
              </div>
            </div>
          ))}
        </Chat>
      </ChatList>
      <CreateRoomModal
        isOpen={createRoomModal}
        setCreateRoomModal={setCreateRoomModal}
      />
    </Container>
  );
}

const Container = styled.main`
  width: 100%;
  background: var(--color-pink-3);
  overflow: auto;
  color: var(--color-black);
`;

const ChatHeader = styled.section`
  position: sticky;
  top: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 1rem;
  z-index: 20;
  background: var(--color-pink-3);
  height: 4rem;
  border-bottom: 1px solid var(--color-gray);

  > h1 {
    font-size: var(--font-size-m);
  }

  > :first-child {
    display: flex;
    justify-content: space-between;
    align-items: center;

    > :last-child {
      cursor: pointer;
      margin-left: 1rem;
    }
  }
`;

const ChatList = styled.section``;

const Chat = styled.div`
  font-size: var(--font-size-s);

  > :nth-child(2n + 1) {
    background: var(--color-white);
  }

  > :nth-child(2n) {
    background: var(--color-white);
  }

  > div {
    height: 5rem;
    width: 100%;
    padding: 0.5rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    cursor: pointer;
    border-bottom: 1px solid var(--color-gray);

    > :first-child {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 0.5rem;
      height: 2rem;

      > :first-child {
        display: flex;
        align-items: center;
        justify-content: start;
        font-family: 'BR-bold';

        > :nth-child(2) {
          background: #ff6c6c;
          color: var(--color-white);
          margin-left: 0.5rem;
          padding: 0.3rem;
          border-radius: 15px;
          font-size: var(--font-size-xs);
          animation: colorAnimation 2s linear infinite alternate;
        }

        @keyframes colorAnimation {
          0% {
            background: #ff6c6c;
          }
          50% {
            background: var(--color-pink-1);
          }
          100% {
            background: #ff6c6c;
          }
        }
      }
    }

    > :last-child {
      display: flex;
      justify-content: space-between;
      height: 2rem;

      > :first-child {
        width: 90%;
      }
    }
  }
`;

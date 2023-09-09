import { styled } from 'styled-components';
import { AiFillDelete } from 'react-icons/ai';
import { useDispatch } from 'react-redux';
import { setChatRoomInfo } from '../../../store/ChatRoomInfoStore';
import { ChatRoomData, Room } from '../../../type';
import { BASE_URL } from '../../../util/constantValue';
import { calculateTimeDifference } from '../../../util/timeDifferenceCalculator';
import { UseQueryResult, useMutation } from 'react-query';
import { useState } from 'react';
import { BsPeopleFill } from 'react-icons/bs';
import CreateRoomModal from './CreateRoomModal';
import { FaPeopleGroup } from 'react-icons/fa6';
import { CgCloseR } from 'react-icons/cg';
import { FiPlusCircle } from 'react-icons/fi';
import { deleteData } from '../../../apis';

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
    () => deleteData(`${BASE_URL}/rooms/${roomToDelete}`),
    {
      onSuccess: () => {
        getRoomQuery.refetch();
      },
    },
  );

  const handleChatRoomClick = (room: Room) => {
    dispatch(
      setChatRoomInfo({
        roomName: room.roomName,
        roomId: room.roomId,
        roomType: room.roomType,
        memberCount: room.memberCount,
        unreadCount: room.unreadCount,
        lastMessage: room.lastMessage,
        lastSentTime: room.lastSentTime,
        lastCheckedTime: room.lastCheckedTime,
      }),
    );
  };

  const handleMouseOver = (roomId: number) => {
    setRoomToDelete(roomId);
  };

  const handleDelete = (event: MouseEvent) => {
    event.stopPropagation();
    const userConfirmed = confirm('정말 채팅방을 삭제하시겠습니까?');
    if (userConfirmed) {
      deleteMutation.mutate();
      setIsDataDifferent(false);
    }
  };

  const handleCreateRoom = () => {
    setCreateRoomModal(true);
  };

  return (
    <Container>
      <ChatHeader>
        <h1>모모 채팅목록</h1>
        <div>
          <FiPlusCircle size={24} onClick={handleCreateRoom} />
          <CgCloseR size={24} onClick={handleModalClose} />
        </div>
      </ChatHeader>
      <ChatList>
        <Chat>
          {prevRoom.map((room, idx) => (
            <div key={idx} onClick={() => handleChatRoomClick(room)}>
              <div>
                <div>
                  <div>
                    {room.roomType === 'PERSONAL' ? (
                      <BsPeopleFill size={24} />
                    ) : (
                      <FaPeopleGroup size={24} />
                    )}
                    <div>{room.roomName}</div>
                    <div>{room.memberCount}</div>
                  </div>
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

const Container = styled.section`
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
  padding: 1rem 0.5rem 1rem 0.5rem;
  z-index: 20;
  background: var(--color-pink-3);
  height: 3rem;
  border-bottom: 1px solid var(--color-gray);

  > h1 {
    font-size: var(--font-size-s);
  }

  > :last-child {
    display: flex;
    justify-content: center;
    align-items: center;

    :hover {
      color: var(--color-pink-1);
    }

    > :first-child {
      cursor: pointer;
    }

    > :last-child {
      cursor: pointer;
      margin-left: 0.5rem;
    }
  }
`;

const ChatList = styled.section``;

const Chat = styled.div`
  font-size: var(--font-size-s);

  > :hover {
    border: 2px solid var(--color-pink-1);
  }

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

        > :first-child {
          display: flex;
          align-items: center;

          > :nth-child(2) {
            margin: 0 0.5rem;
          }

          > :nth-child(3) {
            background: var(--color-gray);
            padding: 0.2rem;
            border-radius: 5px;
          }
        }

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

    > :last-child {
      > :first-child {
        color: var(--color-black) !important;
      }
      :hover {
        color: var(--color-pink-1);
      }
      > :last-child {
      }
    }
  }
`;

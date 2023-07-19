import { styled } from 'styled-components';
import { MdOutlineClose } from 'react-icons/md';
import { AiFillDelete } from 'react-icons/ai';
import { useDispatch } from 'react-redux';
import { setChatRoomInfo } from '../../../store/ChatRoomInfoStore';
import { Room } from '../../../type';
import { BASE_URL, CHAT_NOTICE } from '../../../util/constantValue';
import { calculateTimeDifference } from '../../../util/timeDifferenceCalculator';
import { useMutation } from 'react-query';
import deleteRoom from '../api/deleteRoom';
import { useState } from 'react';

export default function ChatMain({
  handleModalClose,
  prevRoom,
}: {
  handleModalClose: () => void;
  prevRoom: Room[];
}) {
  const dispatch = useDispatch();

  const [roomToDelete, setRoomToDelete] = useState(0);

  const deleteMutation = useMutation('deleteRoom', () =>
    deleteRoom(`${BASE_URL}/chats/delete/${roomToDelete}`),
  );

  const handleChatRoomClick = (room: Room) => {
    dispatch(setChatRoomInfo({ roomName: room.roomName, roomId: room.roomId }));
  };

  const handleMouseOver = (roomId: number) => {
    setRoomToDelete(roomId);
  };

  const handleDelete = () => {
    deleteMutation.mutate();
  };

  return (
    <Container>
      <ChatHeader>
        <h1>채팅방</h1>
        <MdOutlineClose size={32} onClick={handleModalClose} />
      </ChatHeader>
      <ChatList>
        <Chat>
          {prevRoom
            ?.sort((a, b) => +b.lastSentTime - +a.lastSentTime)
            .map((room, idx) => (
              <div key={idx} onClick={() => handleChatRoomClick(room)}>
                <div>
                  <div>
                    <div>{room.roomName}</div>
                    {room.lastCheckTime < room.lastSentTime && (
                      <div>{CHAT_NOTICE}</div>
                    )}
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

  > :last-child {
    cursor: pointer;
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

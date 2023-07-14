import { styled } from 'styled-components';
import { MdOutlineClose } from 'react-icons/md';
import { AiFillDelete } from 'react-icons/ai';
import { useDispatch } from 'react-redux';
import { setChatPage } from '../../../store/ChatPageStore';
import { ChatRoomData, Room } from '../../../type';
import { CHAT_NOTICE } from '../../../util/constantValue';
import { calculateTimeDifference } from '../../../util/timeCalculator';

export default function ChatMain({
  handleModalChange,
  data,
}: {
  handleModalChange: () => void;
  data: ChatRoomData;
}) {
  const dispatch = useDispatch();

  const handleChatRoomClick = (room: Room) => {
    dispatch(setChatPage(room.roomId));
  };

  // const rooms = data?.rooms;

  const rooms = [
    {
      roomId: 7,
      roomName: 'moosaeng',
      lastMessage:
        '아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아',
      lastSentTime: '2023-07-13T23:20:46.368312',
      lastCheckTime: '2023-07-13T23:10:46.368312',
    },
    {
      roomId: 4,
      roomName: 'yoon',
      lastMessage: 'hello',
      lastSentTime: '2023-07-13T23:20:41.45445',
      lastCheckTime: '2023-07-13T23:20:46.368312',
    },
    {
      roomId: 5,
      roomName: 'yoon',
      lastMessage: 'hello',
      lastSentTime: '2023-07-13T23:20:41.45445',
      lastCheckTime: '2023-07-13T23:20:46.368312',
    },
  ];

  return (
    <Container>
      <ChatHeader>
        <h1>채팅방</h1>
        <MdOutlineClose size={32} onClick={handleModalChange} />
      </ChatHeader>
      <ChatList>
        <Chat>
          {rooms
            ?.sort((a, b) => +b.lastSentTime - +a.lastSentTime)
            .map((room) => (
              <div key={room.roomId} onClick={() => handleChatRoomClick(room)}>
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
                    {room.lastMessage.length > 20
                      ? `${room.lastMessage.slice(0, 20)}...`
                      : room.lastMessage}
                  </div>
                  <AiFillDelete size={16} />
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
    background: var(--color-pink-3);
  }

  > div {
    height: 5rem;
    width: 100%;
    padding: 0.5rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    cursor: pointer;

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

        > :nth-child(2) {
          background: #ff4848;
          color: var(--color-white);
          margin-left: 0.5rem;
          padding: 0.3rem;
          border-radius: 15px;
          font-size: var(--font-size-xs);
          animation: colorAnimation 2s linear infinite alternate;
        }

        @keyframes colorAnimation {
          0% {
            background: #ff4848;
          }
          50% {
            background: var(--color-pink-1);
          }
          100% {
            background: #ff4848;
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

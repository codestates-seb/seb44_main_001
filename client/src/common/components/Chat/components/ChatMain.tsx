import { styled } from 'styled-components';
import { MdOutlineClose } from 'react-icons/md';
import { AiFillDelete } from 'react-icons/ai';
import { useDispatch } from 'react-redux';
import { setChatPage } from '../../../store/ChatPageStore';
import { ChatRoomData, Room } from '../../../type';
import { CHAT_NOTICE } from '../../../util/constantValue';

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
        <MdOutlineClose size={16} onClick={handleModalChange} />
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
                  <div>{room.lastSentTime.slice(0, 10)}</div>
                </div>
                <div>
                  <div>
                    {room.lastMessage.length > 15
                      ? `${room.lastMessage.slice(0, 15)}...`
                      : room.lastMessage}
                  </div>
                  <AiFillDelete size={14} />
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
  padding: 1rem 0.5rem 1rem 0.5rem;
  z-index: 20;
  background: var(--color-pink-3);
  height: 3rem;

  > h1 {
    font-size: var(--font-size-s);
  }

  > :last-child {
    cursor: pointer;
  }
`;

const ChatList = styled.section``;

const Chat = styled.div`
  font-size: var(--font-size-xs);

  > :nth-child(2n + 1) {
    background: var(--color-white);
  }

  > :nth-child(2n) {
    background: var(--color-pink-3);
  }

  > div {
    height: 4rem;
    width: 100%;
    padding: 0.5rem;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    cursor: pointer;

    > :first-child {
      display: flex;
      justify-content: space-between;
      margin-bottom: 0.5rem;

      > :first-child {
        display: flex;
        align-items: center;
        justify-content: start;

        > :nth-child(2) {
          background: var(--color-pink-1);
          margin-left: 0.5rem;
          padding: 0.2rem;
          border-radius: 10px;
        }
      }
    }

    > :last-child {
      display: flex;
      justify-content: space-between;

      > :first-child {
        width: 90%;
      }
    }
  }
`;

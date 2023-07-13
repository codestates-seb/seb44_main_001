import { styled } from 'styled-components';
import { MdOutlineClose } from 'react-icons/md';
import { AiFillDelete } from 'react-icons/ai';
import { useDispatch } from 'react-redux';
import { setChatPage } from '../../../store/ChatPageStore';

export default function ChatMain({
  handleModalChange,
  chatRoomList,
}: {
  handleModalChange: () => void;
  chatRoomList: [] | undefined;
}) {
  const dispatch = useDispatch();

  const handleChatRoomClick = () => {
    dispatch(setChatPage(1));
  };

  return (
    <Container>
      <ChatHeader>
        <h1>채팅방</h1>
        <MdOutlineClose size={16} onClick={handleModalChange} />
      </ChatHeader>
      <ChatList>
        <Chat>
          {chatRoomList?.map((room: any, index: number) => (
            <div key={index} onClick={handleChatRoomClick}>
              <div>
                <div>{room.name}</div>
                <div>{room.lastActive}</div>
              </div>
              <div>
                <div>{room.message}</div>
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

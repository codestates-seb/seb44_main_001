import { BiArrowBack } from 'react-icons/bi';
import { useDispatch } from 'react-redux';
import { styled } from 'styled-components';
import { setChatPage } from '../../../store/ChatPageStore';

export default function ChatRoom({ chatPage }: { chatPage: number }) {
  const dispatch = useDispatch();
  const roomId = 1;

  const interlocutor = '무갑';

  const handleChatPage = () => {
    dispatch(setChatPage(0));
  };

  return (
    chatPage === roomId && (
      <Container>
        <ChatHeader>
          <BiArrowBack size={16} onClick={handleChatPage} />
          <h1>{`${interlocutor} 님과의 채팅방`}</h1>
        </ChatHeader>
        <Chat></Chat>
      </Container>
    )
  );
}

const Container = styled.main`
  width: 100%;
  background: var(--color-white);
  overflow: auto;
  color: var(--color-black);
`;

const ChatHeader = styled.section`
  position: sticky;
  top: 0;
  display: flex;
  justify-content: start;
  align-items: center;
  width: 100%;
  padding: 1rem 0.5rem 1rem 0.5rem;
  z-index: 20;
  background: var(--color-pink-3);
  height: 3rem;

  > :first-child {
    cursor: pointer;
  }

  > h1 {
    margin-left: 1rem;
    font-size: var(--font-size-s);
  }
`;

const Chat = styled.section``;

const Interlocutor = styled.div``;

const Me = styled.div``;

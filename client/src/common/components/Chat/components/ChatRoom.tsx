import { BiArrowBack } from 'react-icons/bi';
import { useDispatch, useSelector } from 'react-redux';
import { styled } from 'styled-components';
import { setChatRoomInfo } from '../../../store/ChatRoomInfoStore';
import { RootState } from '../../../store/RootStore';
import { ChangeEvent, useState } from 'react';
import { FiSend } from 'react-icons/fi';
import { BASE_URL } from '../../../util/constantValue';
import { PrevChatData, PostChat, ChatData } from '../../../type';
import { useMutation, useQuery } from 'react-query';
import getPrevChat from '../api/getPrevChat';
import postChat from '../api/postChat';

export default function ChatRoom({ messages }: { messages: ChatData[] }) {
  const [myChat, setMyChat] = useState({ content: '' });

  const dispatch = useDispatch();

  const roomId = useSelector((state: RootState) => state.chatRoomInfo.roomId);

  const roomName = useSelector(
    (state: RootState) => state.chatRoomInfo.roomName,
  );

  const userName = useSelector((state: RootState) => state.myData.nickname);

  const { data } = useQuery<PrevChatData, unknown>('prevChats', async () => {
    if (roomId) {
      const prevChatData = await getPrevChat(`${BASE_URL}/chats/${roomId}`);
      return prevChatData;
    }
    return null;
  });

  const postMutation = useMutation<void, unknown, PostChat>(() =>
    postChat(`${BASE_URL}/chats/${roomId}`, myChat),
  );

  const handleChatPage = () => {
    dispatch(setChatRoomInfo({ roomId: 0, roomName: '' }));
  };

  const handleChatInput = (event: ChangeEvent<HTMLInputElement>) => {
    setMyChat({ content: event.target.value });
  };

  const handleSend = () => {
    postMutation.mutate(myChat);
  };

  return (
    roomId !== 0 && (
      <Container>
        <ChatHeader>
          <BiArrowBack size={24} onClick={handleChatPage} />
          <h1>{`${roomName} 님과의 채팅방`}</h1>
        </ChatHeader>
        <Chat>
          {data &&
            data.chats.map((chat) => {
              if (chat.nickname !== userName) {
                return (
                  <OthersChat key={chat.sentTime}>
                    <div>{chat.nickname}</div>
                    <div>{chat.content}</div>
                  </OthersChat>
                );
              } else {
                return (
                  <MyChat key={chat.sentTime}>
                    <div>{chat.content}</div>
                  </MyChat>
                );
              }
            })}
        </Chat>
        <Chat>
          {messages[0].memberId &&
            messages.map((message) => {
              if (message.nickname !== userName) {
                return (
                  <OthersChat key={message.sentTime}>
                    <div>{message.nickname}</div>
                    <div>{message.content}</div>
                  </OthersChat>
                );
              } else {
                return (
                  <MyChat key={message.sentTime}>
                    <div>{message.content}</div>
                  </MyChat>
                );
              }
            })}
        </Chat>
        <ChatInputSection>
          <input type="text" onChange={handleChatInput} />
          <FiSend onClick={handleSend} size={20} />
        </ChatInputSection>
      </Container>
    )
  );
}

const Container = styled.main`
  width: 100%;
  background: var(--color-white);
  overflow: auto;
  color: var(--color-black);
  display: flex;
  flex-direction: column;
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

const Chat = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  height: 25rem;
`;

const OthersChat = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: start;

  > :first-child {
    color: #ff6c6c;
    padding: 0.3rem 0.5rem 0.3rem 0.5rem;
    background: var(--color-pink-3);
    border-radius: 20px;
    margin: 0.5rem 0 0 0.5rem;
  }

  > :last-child {
    padding: 0.3rem 0.5rem 0.3rem 0.5rem;
    background: var(--color-white);
    border-radius: 20px;
    border: 2px solid var(--color-black);
    margin: 0.2rem 0 0 0.5rem;
  }
`;

const MyChat = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: end;

  > div {
    padding: 0.3rem 0.5rem 0.3rem 0.5rem;
    background: var(--color-pink-2);
    border-radius: 20px;
    border: 2px solid var(--color-black);
    margin: 0.5rem 0.5rem 0 0;
  }
`;

const ChatInputSection = styled.section`
  margin: 0 0.5rem;
  position: relative;

  > input {
    width: 100%;
    padding: 0.5rem;
    font-size: var(--font-size-s);
    color: var(--color-black);
    margin-bottom: 0.5rem;
  }

  > svg {
    position: fixed;
    bottom: 10.1rem;
    right: 4rem;
    cursor: pointer;
  }
`;

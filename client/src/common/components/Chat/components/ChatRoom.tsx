import { BiArrowBack } from 'react-icons/bi';
import { useDispatch, useSelector } from 'react-redux';
import { styled } from 'styled-components';
import { setChatRoomInfo } from '../../../store/ChatRoomInfoStore';
import { RootState } from '../../../store/RootStore';
import { ChangeEvent, KeyboardEvent, useEffect, useRef, useState } from 'react';
import { FiSend } from 'react-icons/fi';
import { BASE_URL } from '../../../util/constantValue';
import { PrevChatData, PostChat, ChatData } from '../../../type';
import { useMutation, useQuery } from 'react-query';
import getPrevChat from '../api/getPrevChat';
import postChat from '../api/postChat';
import postOffline from '../api/postOffline';

export default function ChatRoom({
  messages,
  setMessages,
}: {
  messages: ChatData[];
  setMessages: React.Dispatch<React.SetStateAction<object[]>>;
}) {
  const [myChat, setMyChat] = useState({ roomId: 0, content: '' });

  const [prevChat, setPrevChat] = useState<ChatData[]>([
    {
      roomId: 0,
      memberId: 0,
      nickname: '',
      content: '',
      participantType: '',
      sentTime: '',
    },
  ]);

  const dispatch = useDispatch();

  const roomId = useSelector((state: RootState) => state.chatRoomInfo.roomId);

  const roomName = useSelector(
    (state: RootState) => state.chatRoomInfo.roomName,
  );

  const newMessages = messages.slice(1);

  const userName = useSelector((state: RootState) => state.myData.nickname);

  useQuery<PrevChatData, unknown>(
    'prevChats',
    () => getPrevChat(`${BASE_URL}/rooms/${roomId}`),
    {
      enabled: roomId !== 0 && roomId !== undefined,
      onSuccess: (data) => {
        setPrevChat(data.chats);
        setMessages([{}]);
      },
    },
  );

  const postMutation = useMutation<void, unknown, PostChat>('postChat', () =>
    postChat(`${BASE_URL}/chats`, myChat),
  );

  const postOfflineMutation = useMutation<void, unknown, number>(
    'postOffline',
    (roomId) => postOffline(`${BASE_URL}/rooms/${roomId}/offline`),
  );

  const handleChatPage = () => {
    dispatch(setChatRoomInfo({ roomId: 0, roomName: '' }));
    postOfflineMutation.mutate(roomId);
  };

  const handleChatInput = (event: ChangeEvent<HTMLInputElement>) => {
    setMyChat({ roomId: roomId, content: event.target.value });
  };

  const handleSend = () => {
    if (myChat.content !== '') {
      postMutation.mutate(myChat);
      setMyChat({ roomId: roomId, content: '' });
    }
  };

  const handleKeyUp = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSend();
    }
  };

  useEffect(() => {
    return () => {
      setMessages([{}]);
      postOfflineMutation.mutate(roomId);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const chatWrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatWrapperRef.current && newMessages.length > 0) {
      chatWrapperRef.current.scrollTop = chatWrapperRef.current.scrollHeight;
    }
  }, [roomId, newMessages]);

  return (
    roomId !== 0 && (
      <Container>
        <ChatHeader>
          <BiArrowBack size={24} onClick={handleChatPage} />
          <h1>{`${roomName} 님과의 채팅방`}</h1>
        </ChatHeader>
        <ChatWrapper ref={chatWrapperRef}>
          <Chat>
            {prevChat?.map((chat, idx) => {
              if (chat.nickname !== userName) {
                return (
                  <OthersChat key={idx}>
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
            {newMessages.map((message, idx) => {
              if (message.nickname !== userName) {
                return (
                  <OthersChat key={idx}>
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
        </ChatWrapper>
        <ChatInputSection>
          <input
            type="text"
            onChange={handleChatInput}
            onKeyUp={handleKeyUp}
            value={myChat.content}
          />
          <FiSend onClick={handleSend} size={20} />
        </ChatInputSection>
      </Container>
    )
  );
}

const Container = styled.main`
  width: 100%;
  min-height: 100%;
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

const ChatWrapper = styled.div`
  height: calc(100% - 6.125rem);
  overflow: auto;
`;

const Chat = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  height: fit-content;
`;

const OthersChat = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: start;
  height: fit-content;

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
  margin: 0.5rem;
  bottom: 0;
  height: 2rem;
  display: flex;
  align-items: center;
  > input {
    width: 100%;
    padding: 0.5rem;
    font-size: var(--font-size-s);
    color: var(--color-black);
  }

  > svg {
    position: fixed;
    bottom: 10.1rem;
    right: 4rem;
    cursor: pointer;
  }
`;

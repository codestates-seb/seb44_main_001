import { BiArrowBack } from 'react-icons/bi';
import { useDispatch, useSelector } from 'react-redux';
import { styled } from 'styled-components';
import { setChatPage } from '../../../store/ChatPageStore';
import { RootState } from '../../../store/RootStore';
import { ChangeEvent, useState } from 'react';
import { FiSend } from 'react-icons/fi';
import { BASE_URL } from '../../../util/constantValue';
import { PrevChatData } from '../../../type';
import { useQuery } from 'react-query';
import getPrevChat from '../api/getPrevChat';

export default function ChatRoom() {
  const [myChat, setMyChat] = useState('');

  const dispatch = useDispatch();

  const roomId = useSelector((state: RootState) => state.chatPage);

  const token = localStorage.getItem('Authorization');

  const { data } = useQuery<PrevChatData, unknown>('prevChats', () =>
    getPrevChat(`${BASE_URL}/chats/1`, token as string),
  );

  console.log(data);
  // 이전 채팅 기록 가져오는 로직

  //TODO roomId에 맞는 방 데이터를 받아오는 로직 작성해야함

  const chatPartner = 'moosaeng';
  //TODO 방 데이터에서 상대 유저이름 받아와야함
  const userInfo = {
    name: 'moomoo',
  };
  //TODO 내 유저정보 받아와야함

  // const data = {
  //   chats: [
  //     {
  //       memberId: 7,
  //       nickName: 'myoungin',
  //       content: 'moosaeng',
  //       sentTime: '2023-07-13T23:20:46.368312',
  //     },
  //     {
  //       memberId: 7,
  //       nickName: 'myoungin',
  //       content: 'moosaeng',
  //       sentTime: '2023-07-14T23:20:46.368312',
  //     },
  //     {
  //       memberId: 5,
  //       nickName: 'moosaeng',
  //       content: '왜 불러',
  //       sentTime: '2023-07-15T23:20:46.368312',
  //     },
  //   ],
  // };

  const handleChatPage = () => {
    dispatch(setChatPage(0));
  };

  const handleChatInput = (event: ChangeEvent<HTMLInputElement>) => {
    setMyChat(event.target.value);
  };

  const handleSend = () => {
    console.log(123);
  };

  return (
    roomId !== 0 && (
      <Container>
        <ChatHeader>
          <BiArrowBack size={24} onClick={handleChatPage} />
          <h1>{`${chatPartner} 님과의 채팅방`}</h1>
        </ChatHeader>
        <Chat>
          {data &&
            data.chats.map((chat) => {
              if (chat.nickname !== userInfo.name) {
                return (
                  <OthersChat>
                    <div>{chat.nickname}</div>
                    <div>{chat.content}</div>
                  </OthersChat>
                );
              } else {
                return (
                  <MyChat>
                    <div>{chat.content}</div>
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
  }

  > svg {
    position: fixed;
    bottom: 10.1rem;
    right: 4rem;
  }
`;

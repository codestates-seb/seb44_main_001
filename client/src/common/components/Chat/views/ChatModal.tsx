import { AiFillWechat } from 'react-icons/ai';
import { keyframes, styled } from 'styled-components';
import Modal from 'react-modal';
import { useEffect, useState } from 'react';
import { modalStyle } from '../modalStyle';
import ChatMain from '../components/ChatMain';
import ChatRoom from '../components/ChatRoom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../store/RootStore';
import { useQuery } from 'react-query';
import { BASE_URL } from '../../../util/constantValue';
import getRoomList from '../api/getRoomList';
import { setChatModal } from '../../../store/ChatModalStore';
import { ChatData, ChatRoomData, Room } from '../../../type';
import * as StompJs from '@stomp/stompjs';
import SockJS from 'sockjs-client';

export default function ChatButton() {
  const [messages, setMessages] = useState([{}]);

  const [prevRoom, setPrevRoom] = useState<Room[]>([
    {
      roomId: 0,
      roomName: '',
      lastMessage: '',
      lastSentTime: '',
      lastCheckTime: '',
    },
  ]);

  const token = localStorage.getItem('Authrization');

  const dispatch = useDispatch();

  const isOpen = useSelector((state: RootState) => state.chatModal);

  const chatRoom = useSelector((state: RootState) => state.chatRoomInfo.roomId);

  const client = new StompJs.Client({
    brokerURL:
      'ws://ec2-3-34-45-1.ap-northeast-2.compute.amazonaws.com:8080/stomp/chat',
    connectHeaders: {
      Authorization: token as string,
    },
  });

  if (typeof WebSocket !== 'function') {
    client.webSocketFactory = function () {
      return new SockJS(
        'http://ec2-3-34-45-1.ap-northeast-2.compute.amazonaws.com:8080/stomp/chat',
      ) as StompJs.IStompSocket;
    };
  }

  useQuery<ChatRoomData, unknown>(
    'roomList',
    () => getRoomList(`${BASE_URL}/chats`),
    {
      enabled: isOpen && !chatRoom,
      refetchInterval: 5000,
      onSuccess: (data) => {
        setPrevRoom(data.rooms);
      },
    },
  );
  // 기존 채팅방 목록 가져오기

  //TODO 채팅방 삭제 버튼 클릭 시 구독 취소

  useEffect(() => {
    if (chatRoom !== 0) {
      client.activate();

      client.onConnect = function () {
        console.log('websocket is connected');
        console.log(chatRoom);
        client.subscribe(`/sub/chat/room/${chatRoom}`, (message) => {
          console.log(chatRoom + '번방에 입장하였습니다.');
          const receivedMessage = JSON.parse(message.body);
          console.log('이건 응답' + message.body);
          console.log('이건 파싱한 응답' + receivedMessage);
          setMessages((prevMessages) => [...prevMessages, receivedMessage]);
          console.log('이건 저장된 갯수' + messages.length);
        });
      };

      client.onStompError = function (frame) {
        console.log('STOMP error: ', frame.headers, frame.body);
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chatRoom]);

  const handleModalOpen = () => {
    dispatch(setChatModal(true));
  };

  const handleModalClose = () => {
    dispatch(setChatModal(false));
  };

  return (
    <Container>
      <button onClick={isOpen ? handleModalClose : handleModalOpen}>
        <AiFillWechat size={48} color={'var(--color-white)'} />
      </button>
      <Modal
        isOpen={isOpen}
        style={modalStyle}
        onRequestClose={handleModalClose}
        ariaHideApp={false}
      >
        {chatRoom === 0 && (
          <ChatMain
            handleModalClose={handleModalClose}
            prevRoom={prevRoom as Room[]}
          />
        )}
        <ChatRoom messages={messages as ChatData[]} />
      </Modal>
    </Container>
  );
}

const pulseAnimation = keyframes`
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.2);
  }
  100% {
    transform: scale(1);
  }
`;

const Container = styled.section`
  position: fixed;
  bottom: 3rem;
  right: 3rem;

  > button {
    border: none;
    height: 5rem;
    width: 5rem;
    border-radius: 50%;
    cursor: pointer;
    background: var(--color-pink-1);

    > svg {
      animation: ${pulseAnimation} 1s ease-in-out infinite;
      border-radius: 50%;
    }
  }
  :active {
    background: var(--color-pink-2);
  }
`;

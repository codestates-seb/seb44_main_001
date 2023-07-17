import { AiFillWechat } from 'react-icons/ai';
import { keyframes, styled } from 'styled-components';
import Modal from 'react-modal';
import { useEffect } from 'react';
import { modalStyle } from '../modalStyle';
import ChatMain from '../components/ChatMain';
import ChatRoom from '../components/ChatRoom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../store/RootStore';
import { useQuery } from 'react-query';
import { BASE_URL } from '../../../util/constantValue';
import getRoomList from '../api/getRoomList';
import { setChatModal } from '../../../store/ChatModalStore';
import { ChatRoomData } from '../../../type';
import * as StompJs from '@stomp/stompjs';
import * as SockJS from 'sockjs-client';

export default function ChatButton() {
  const dispatch = useDispatch();

  const token = localStorage.getItem('Authorization');

  const isOpen = useSelector((state: RootState) => state.chatModal);

  const chatPage = useSelector((state: RootState) => state.chatPage);

  const client = new StompJs.Client({
    brokerURL: 'ws://ba5b-106-252-38-27.ngrok-free.app/stomp/chat',
    debug: function (err) {
      console.log(err);
    },
  });

  // if (typeof WebSocket !== 'function') {
  //   client.webSocketFactory = function () {
  //     return new SockJS('/stomp/chat');
  //   };
  // }

  client.onConnect = function (frame) {
    console.log(frame);
  };

  client.onStompError = function (frame) {
    console.log(frame.headers);
    console.log(frame.body);
  };

  const { data } = useQuery<ChatRoomData, unknown>(
    'roomList',
    () => getRoomList(`${BASE_URL}/chats`, token as string),
    {
      enabled: isOpen,
      refetchInterval: 5000,
    },
  );
  // 기존 채팅방 목록 가져오기

  //TODO 모달 열리면 기존 채팅방들 구독하는 로직 추가해야함

  //TODO 채팅방 삭제 버튼 클릭 시 구독 취소

  const handleModalChange = () => {
    dispatch(setChatModal(!isOpen));
  };

  useEffect(() => {
    if (isOpen === true) {
      client.activate();
    }
    if (isOpen === false) {
      client.deactivate();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  return (
    <Container>
      <button onClick={handleModalChange}>
        <AiFillWechat size={48} color={'var(--color-white)'} />
      </button>
      <Modal
        isOpen={isOpen}
        style={modalStyle}
        onRequestClose={handleModalChange}
        ariaHideApp={false}
      >
        {chatPage === 0 && (
          <ChatMain
            handleModalChange={handleModalChange}
            data={data as ChatRoomData}
          />
        )}
        <ChatRoom />
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

import { AiFillWechat } from 'react-icons/ai';
import { keyframes, styled } from 'styled-components';
import Modal from 'react-modal';
import { useEffect, useState } from 'react';
import { modalStyle } from '../chatModalStyle';
import ChatMain from '../components/ChatMain';
import ChatRoom from '../components/ChatRoom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../store/RootStore';
import { useMutation, useQuery } from 'react-query';
import { BASE_URL } from '../../../util/constantValue';
import { setChatModal } from '../../../store/ChatModalStore';
import { ChatData, ChatRoomData, Room } from '../../../type';
import * as StompJs from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import { resetChatRoomInfo } from '../../../store/ChatRoomInfoStore';
import { getData, postData } from '../../../apis';
import { AUTHORIZATION } from '../../../util/constantValue';

export default function ChatModal() {
  const [messages, setMessages] = useState<ChatData[]>([]);

  const [prevRoom, setPrevRoom] = useState<Room[] | []>([]);

  const [isDataDifferent, setIsDataDifferent] = useState(false);

  const [subscription, setSubscription] =
    useState<StompJs.StompSubscription | null>(null);

  const token = localStorage.getItem(AUTHORIZATION);

  const dispatch = useDispatch();

  const isOpen = useSelector((state: RootState) => state.chatModal);

  const chatRoom = useSelector((state: RootState) => state.chatRoomInfo.roomId);

  const client = new StompJs.Client({
    brokerURL: 'wss://momomomo.shop:8080/stomp/chat',
    connectHeaders: {
      Authorization: token as string,
    },
  });

  if (typeof WebSocket !== 'function') {
    client.webSocketFactory = function () {
      return new SockJS(`${BASE_URL}/stomp/chat`) as StompJs.IStompSocket;
    };
  }

  const updatePrevRoom = (_prevRoom: Room[], newRoom: Room[]) => {
    return [...newRoom];
  };

  const getRoomQuery = useQuery<ChatRoomData, unknown>(
    'roomList',
    () => getData(`${BASE_URL}/rooms/list`),
    {
      enabled: chatRoom === 0,
      refetchInterval: 5000,
      onSuccess: (data) => {
        setIsDataDifferent(
          !isOpen &&
            data.rooms.filter((rooom) => rooom.unreadCount !== 0).length !== 0,
        );

        setPrevRoom((prevRoom) => updatePrevRoom(prevRoom, data.rooms));
      },
    },
  );
  // 기존 채팅방 목록 가져오기

  const postOnlineMutation = useMutation<void, unknown, number>(
    'postOnline',
    (roomId) => postData(`${BASE_URL}/rooms/${roomId}/online`, null),
  );

  const postOfflineMutation = useMutation<void, unknown, number>(
    'postOffline',
    (roomId) => postData(`${BASE_URL}/rooms/${roomId}/offline`, null),
  );

  const handleModalOpen = () => {
    dispatch(setChatModal(true));
    getRoomQuery.refetch();
  };

  const handleModalClose = () => {
    dispatch(setChatModal(false));
    dispatch(resetChatRoomInfo());
    if (chatRoom) {
      postOfflineMutation.mutate(chatRoom);
    }
  };

  const handleWebSocketMessage = (message: StompJs.IMessage) => {
    const receivedMessage = JSON.parse(message.body);
    setTimeout(() => {
      setMessages((prevMessages) => {
        return [...prevMessages, receivedMessage];
      }),
        0;
    });
  };

  useEffect(() => {
    if (chatRoom !== 0) {
      client.activate();

      client.onConnect = function () {
        const subscription = client.subscribe(
          `/sub/chat/room/${chatRoom}`,
          handleWebSocketMessage,
        );

        setSubscription(subscription);
        postOnlineMutation.mutate(chatRoom);
      };
    }

    client.onStompError = function (frame) {
      console.log('STOMP error: ', frame.headers, frame.body);
    };

    if (chatRoom === 0) {
      if (subscription) {
        subscription.unsubscribe();
        setSubscription(null);
        getRoomQuery.refetch();
      }
      getRoomQuery.refetch();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chatRoom]);

  useEffect(() => {
    if (isOpen) {
      setIsDataDifferent(false);
    }
  }, [isOpen]);

  return (
    <Container>
      <button
        onClick={isOpen ? handleModalClose : handleModalOpen}
        className={isDataDifferent ? 'colorOn' : ''}
        aria-label="chatting-list"
      >
        <AiFillWechat
          size={48}
          color={'var(--color-white)'}
          className={isDataDifferent ? 'pulseOn' : ''}
        />
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
            prevRoom={prevRoom}
            getRoomQuery={getRoomQuery}
            setIsDataDifferent={setIsDataDifferent}
          />
        )}
        <ChatRoom
          messages={messages as ChatData[]}
          setMessages={setMessages}
          handleModalClose={handleModalClose}
        />
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
  z-index: 10;
  > button {
    border: none;
    height: 5rem;
    width: 5rem;
    border-radius: 50%;
    cursor: pointer;
    background: linear-gradient(90deg, var(--color-pink-1), #ff7787);

    > .pulseOn {
      animation: ${pulseAnimation} 1s ease-in-out infinite;
      border-radius: 50%;
    }
  }

  @keyframes colorChange {
    0% {
    }
    100% {
      border: 5px solid #ff8181;
    }
  }

  .colorOn {
    animation: colorChange 1s infinite;
  }
`;

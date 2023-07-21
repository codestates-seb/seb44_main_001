import { AiFillWechat } from 'react-icons/ai';
import { keyframes, styled } from 'styled-components';
import Modal from 'react-modal';
import { useEffect, useState } from 'react';
import { modalStyle } from '../modalStyle';
import ChatMain from '../components/ChatMain';
import ChatRoom from '../components/ChatRoom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../store/RootStore';
import { useMutation, useQuery } from 'react-query';
import { BASE_URL } from '../../../util/constantValue';
import getRoomList from '../api/getRoomList';
import { setChatModal } from '../../../store/ChatModalStore';
import { ChatData, ChatRoomData, Room } from '../../../type';
import * as StompJs from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import postOnline from '../api/postOnline';

export default function ChatButton() {
  const [messages, setMessages] = useState([{}]);

  const [prevRoom, setPrevRoom] = useState<Room[]>([
    {
      roomId: 0,
      roomName: '',
      unreadCount: 0,
      lastMessage: '',
      lastSentTime: '',
    },
  ]);

  const [isDataDifferent, setIsDataDifferent] = useState(false);

  const [subscription, setSubscription] =
    useState<StompJs.StompSubscription | null>(null);

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
        'https://e9e5-49-163-135-89.ngrok-free.app/stomp/chat',
      ) as StompJs.IStompSocket;
    };
  }

  const updateMessages = (prevMessages: ChatData[], newMessage: ChatData) => {
    return [...prevMessages, newMessage];
  };

  const updatePrevRoom = (_prevRoom: Room[], newRoom: Room[]) => {
    return [...newRoom];
  };

  const getRoomQuery = useQuery<ChatRoomData, unknown>(
    'roomList',
    () => getRoomList(`${BASE_URL}/rooms/list`),
    {
      refetchInterval: 5000,
      onSuccess: (data) => {
        setIsDataDifferent(
          data.rooms.filter((rooom) => rooom.unreadCount !== 0).length !== 0,
        );
        setPrevRoom((prevRoom) => updatePrevRoom(prevRoom, data.rooms));
      },
    },
  );
  // 기존 채팅방 목록 가져오기

  const postOnlineMutation = useMutation<void, unknown, number>(
    'postOnline',
    (roomId) => postOnline(`${BASE_URL}/rooms/${roomId}/online`),
  );

  const handleModalOpen = () => {
    dispatch(setChatModal(true));
    getRoomQuery.refetch();
  };

  const handleModalClose = () => {
    dispatch(setChatModal(false));
  };

  useEffect(() => {
    if (chatRoom !== 0) {
      client.activate();

      client.onConnect = function () {
        console.log('websocket is connected');

        const subscription = client.subscribe(
          `/sub/chat/room/${chatRoom}`,
          (message) => {
            console.log(chatRoom + '번방에 입장하였습니다.');

            const receivedMessage = JSON.parse(message.body);

            setMessages((prevMessages) =>
              updateMessages(prevMessages as ChatData[], receivedMessage),
            );
          },
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
        setIsDataDifferent(false);
        getRoomQuery.refetch();
      }
      setIsDataDifferent(false);
      getRoomQuery.refetch();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chatRoom]);

  return (
    <Container>
      <button
        onClick={isOpen ? handleModalClose : handleModalOpen}
        className={!isDataDifferent ? 'on' : ''}
      >
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
            getRoomQuery={getRoomQuery}
            setIsDataDifferent={setIsDataDifferent}
          />
        )}
        <ChatRoom messages={messages as ChatData[]} setMessages={setMessages} />
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
    background: linear-gradient(
      90deg,
      var(--color-pink-1),
      var(--color-pink-2)
    );

    > svg {
      animation: ${pulseAnimation} 1s ease-in-out infinite;
      border-radius: 50%;
    }
  }

  @keyframes colorChange {
    0% {
      color: white;
    }
    75% {
      color: #ff8181;
    }
    100% {
      color: white;
    }
  }

  .on {
    > svg {
      /* animation: colorChange 1s infinite; */
    }
  }
`;
